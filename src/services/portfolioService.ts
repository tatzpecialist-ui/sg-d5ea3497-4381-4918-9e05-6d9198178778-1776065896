import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PortfolioItem = Tables<"portfolio_items">;
export type PortfolioInsert = Omit<PortfolioItem, "id" | "created_at" | "updated_at">;
export type PortfolioUpdate = Partial<PortfolioInsert>;

// Extract YouTube video ID from various URL formats
export function extractYouTubeId(url: string): string | null {
  console.log("[portfolioService] Extracting YouTube ID from URL:", url);
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      console.log("[portfolioService] Extracted video ID:", match[1]);
      return match[1];
    }
  }
  
  console.error("[portfolioService] Failed to extract YouTube ID from URL:", url);
  return null;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'maxres' = 'maxres'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault', 
    maxres: 'maxresdefault'
  };
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
  console.log("[portfolioService] Generated thumbnail URL:", thumbnailUrl);
  return thumbnailUrl;
}

export const portfolioService = {
  // Get all portfolio items
  async getAllItems(category?: string) {
    let query = supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    console.log("Portfolio query:", { data, error, category });

    if (error) {
      console.error("Error fetching portfolio items:", error);
      throw error;
    }

    return data || [];
  },

  // Get single portfolio item
  async getItemById(id: string) {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching portfolio item:", error);
      throw error;
    }

    return data;
  },

  // Create portfolio item
  async createItem(item: Omit<PortfolioInsert, "video_id" | "youtube_url">, youtubeUrl: string) {
    console.log("[portfolioService] createItem called with:", { item, youtubeUrl });
    
    // Step 1: Validate and extract YouTube video ID
    const videoId = extractYouTubeId(youtubeUrl);
    
    if (!videoId) {
      const errorMsg = "Invalid YouTube URL - could not extract video ID";
      console.error("[portfolioService]", errorMsg);
      throw new Error(errorMsg);
    }

    // Step 2: Generate thumbnail URL
    // We don't save thumbnail_url to DB anymore, we compute it on the fly

    // Step 3: Prepare insert data
    const insertData = {
      ...item,
      youtube_url: youtubeUrl,
      video_id: videoId,
    };
    
    console.log("[portfolioService] Prepared insert data:", insertData);

    // Step 4: Check current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log("[portfolioService] Current session:", { 
      hasSession: !!session, 
      userId: session?.user?.id,
      sessionError 
    });

    // Step 5: Execute database insert
    console.log("[portfolioService] Executing database insert...");
    const { data, error } = await supabase
      .from("portfolio_items")
      .insert(insertData)
      .select()
      .single();

    console.log("[portfolioService] Insert result:", { 
      success: !!data,
      data, 
      error,
      errorCode: error?.code,
      errorMessage: error?.message,
      errorDetails: error?.details,
      errorHint: error?.hint
    });

    if (error) {
      console.error("[portfolioService] Database insert failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    console.log("[portfolioService] Portfolio item created successfully:", data);
    return data;
  },

  // Update portfolio item
  async updateItem(id: string, updates: Partial<Omit<PortfolioInsert, "video_id" | "youtube_url">>, youtubeUrl?: string) {
    console.log("[portfolioService] updateItem called with:", { id, updates, youtubeUrl });
    
    let updateData: Partial<PortfolioItem> = { ...updates };

    // If YouTube URL is being updated, extract new video ID and thumbnail
    if (youtubeUrl) {
      const videoId = extractYouTubeId(youtubeUrl);
      if (!videoId) {
        const errorMsg = "Invalid YouTube URL - could not extract video ID";
        console.error("[portfolioService]", errorMsg);
        throw new Error(errorMsg);
      }
      updateData = {
        ...updateData,
        youtube_url: youtubeUrl,
        video_id: videoId,
      };
    }

    console.log("[portfolioService] Prepared update data:", updateData);

    // Check current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log("[portfolioService] Current session:", { 
      hasSession: !!session, 
      userId: session?.user?.id,
      sessionError 
    });

    console.log("[portfolioService] Executing database update...");
    const { data, error } = await supabase
      .from("portfolio_items")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    console.log("[portfolioService] Update result:", { 
      success: !!data,
      data, 
      error,
      errorCode: error?.code,
      errorMessage: error?.message,
      errorDetails: error?.details,
      errorHint: error?.hint
    });

    if (error) {
      console.error("[portfolioService] Database update failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    console.log("[portfolioService] Portfolio item updated successfully:", data);
    return data;
  },

  // Delete portfolio item
  async deleteItem(id: string) {
    const { error } = await supabase
      .from("portfolio_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting portfolio item:", error);
      throw error;
    }
  },
};