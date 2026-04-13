import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type PortfolioItem = Tables<"portfolio_items">;
export type PortfolioInsert = Omit<PortfolioItem, "id" | "created_at" | "updated_at">;
export type PortfolioUpdate = Partial<PortfolioInsert>;

// Extract YouTube video ID from various URL formats
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

// Get YouTube thumbnail URL
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'maxres' = 'maxres'): string {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault', 
    maxres: 'maxresdefault'
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
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
  async createItem(item: Omit<PortfolioInsert, "youtube_video_id" | "thumbnail_url">, youtubeUrl: string) {
    const videoId = extractYouTubeId(youtubeUrl);
    
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    const thumbnailUrl = getYouTubeThumbnail(videoId);

    const { data, error } = await supabase
      .from("portfolio_items")
      .insert({
        ...item,
        youtube_url: youtubeUrl,
        youtube_video_id: videoId,
        thumbnail_url: thumbnailUrl,
      })
      .select()
      .single();

    console.log("Create portfolio item:", { data, error });

    if (error) {
      console.error("Error creating portfolio item:", error);
      throw error;
    }

    return data;
  },

  // Update portfolio item
  async updateItem(id: string, updates: Partial<Omit<PortfolioInsert, "youtube_video_id" | "thumbnail_url">>, youtubeUrl?: string) {
    let updateData: Partial<PortfolioItem> = { ...updates };

    // If YouTube URL is being updated, extract new video ID and thumbnail
    if (youtubeUrl) {
      const videoId = extractYouTubeId(youtubeUrl);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }
      updateData = {
        ...updateData,
        youtube_url: youtubeUrl,
        youtube_video_id: videoId,
        thumbnail_url: getYouTubeThumbnail(videoId),
      };
    }

    const { data, error } = await supabase
      .from("portfolio_items")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    console.log("Update portfolio item:", { data, error });

    if (error) {
      console.error("Error updating portfolio item:", error);
      throw error;
    }

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