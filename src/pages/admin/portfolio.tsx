import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { portfolioService, extractYouTubeId, getYouTubeThumbnail } from "@/services/portfolioService";
import type { PortfolioItem } from "@/services/portfolioService";
import { Plus, Pencil, Trash2, ExternalLink, Play } from "lucide-react";
import { SEO } from "@/components/SEO";
import { AdminLayout } from "@/components/AdminLayout";

export default function PortfolioAdmin() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    client_name: "",
    category: "video-editing",
    description: "",
    youtube_url: "",
    year: new Date().getFullYear().toString(),
    featured: false,
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await portfolioService.getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Error loading portfolio:", error);
      toast({
        title: "Error",
        description: "Failed to load portfolio items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("[Portfolio Admin] Form submitted with data:", formData);

    if (!formData.title || !formData.client_name || !formData.youtube_url) {
      console.error("[Portfolio Admin] Validation failed - missing required fields:", {
        hasTitle: !!formData.title,
        hasClientName: !!formData.client_name,
        hasYoutubeUrl: !!formData.youtube_url
      });
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate YouTube URL
    const videoId = extractYouTubeId(formData.youtube_url);
    console.log("[Portfolio Admin] YouTube URL validation:", {
      url: formData.youtube_url,
      extractedVideoId: videoId,
      isValid: !!videoId
    });

    if (!videoId) {
      console.error("[Portfolio Admin] Invalid YouTube URL:", formData.youtube_url);
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube link",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log("[Portfolio Admin] Starting save operation...", {
      isEdit: !!editingItem,
      itemId: editingItem?.id
    });

    try {
      if (editingItem) {
        console.log("[Portfolio Admin] Updating existing item:", editingItem.id);
        await portfolioService.updateItem(
          editingItem.id,
          {
            title: formData.title,
            client_name: formData.client_name,
            category: formData.category,
            description: formData.description || null,
            year: parseInt(formData.year) || new Date().getFullYear(),
            is_featured: formData.featured,
          },
          formData.youtube_url
        );
        console.log("[Portfolio Admin] Update successful");
        toast({
          title: "Portfolio Updated",
          description: "Item has been updated successfully",
        });
      } else {
        console.log("[Portfolio Admin] Creating new item");
        await portfolioService.createItem(
          {
            title: formData.title,
            client_name: formData.client_name,
            category: formData.category,
            description: formData.description || null,
            year: parseInt(formData.year) || new Date().getFullYear(),
            is_featured: formData.featured,
          },
          formData.youtube_url
        );
        console.log("[Portfolio Admin] Create successful");
        toast({
          title: "Portfolio Added",
          description: "New item has been added successfully",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      loadItems();
    } catch (error) {
      console.error("[Portfolio Admin] Save operation failed:", {
        error,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        errorCode: (error as any)?.code,
        errorDetails: (error as any)?.details,
        errorHint: (error as any)?.hint
      });
      
      // Provide more specific error message
      let errorDescription = "Failed to save portfolio item";
      if (error instanceof Error) {
        errorDescription = error.message;
      }
      if ((error as any)?.code === "42501") {
        errorDescription = "Permission denied. Please check your authentication and try signing out and back in.";
      }
      
      toast({
        title: "Error",
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      console.log("[Portfolio Admin] Save operation completed");
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      client_name: item.client_name,
      category: item.category,
      description: item.description || "",
      youtube_url: item.youtube_url,
      year: item.year.toString(),
      featured: item.is_featured || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    try {
      await portfolioService.deleteItem(id);
      toast({
        title: "Portfolio Deleted",
        description: "Item has been removed successfully",
      });
      loadItems();
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      client_name: "",
      category: "video-editing",
      description: "",
      youtube_url: "",
      year: new Date().getFullYear().toString(),
      featured: false,
    });
    setEditingItem(null);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const categoryLabels: Record<string, string> = {
    "video-editing": "Video Editing",
    "live-events": "Live Events",
    "documentary": "Documentary",
    "corporate-av": "Corporate AV",
  };

  return (
    <AdminLayout>
      <SEO
        title="Portfolio Management - 13 Media Works"
        description="Manage your portfolio showcase"
      />
      
      <main className="min-h-screen bg-background pt-8 pb-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
                Portfolio Management
              </h1>
              <p className="text-muted-foreground">
                Add and manage your video portfolio showcase
              </p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Portfolio Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}
                  </DialogTitle>
                  <DialogDescription>
                    Paste your YouTube video link and add project details
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtube_url">YouTube URL *</Label>
                    <Input
                      id="youtube_url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={formData.youtube_url}
                      onChange={(e) =>
                        setFormData({ ...formData, youtube_url: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Paste the full YouTube link (e.g., https://youtube.com/watch?v=dQw4w9WgXcQ)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        placeholder="Brand Campaign 2024"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="client_name">Client Name *</Label>
                      <Input
                        id="client_name"
                        placeholder="Client Name"
                        value={formData.client_name}
                        onChange={(e) =>
                          setFormData({ ...formData, client_name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video-editing">Video Editing</SelectItem>
                          <SelectItem value="live-events">Live Events</SelectItem>
                          <SelectItem value="documentary">Documentary</SelectItem>
                          <SelectItem value="corporate-av">Corporate AV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">Year *</Label>
                      <Input
                        id="year"
                        placeholder="2024"
                        value={formData.year}
                        onChange={(e) =>
                          setFormData({ ...formData, year: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the project..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-border bg-background"
                    />
                    <Label htmlFor="featured" className="font-normal cursor-pointer">
                      Feature this project on homepage
                    </Label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDialogClose}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-accent hover:bg-accent/90"
                    >
                      {isSubmitting
                        ? "Saving..."
                        : editingItem
                        ? "Update"
                        : "Add Portfolio Item"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No Portfolio Items Yet</CardTitle>
                <CardDescription>
                  Click "Add Portfolio Item" to showcase your work
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="group overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={getYouTubeThumbnail(item.video_id)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <a
                        href={item.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-accent rounded-full hover:bg-accent/90 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                    {item.is_featured && (
                      <Badge className="absolute top-2 right-2 bg-accent">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{item.title}</CardTitle>
                        <CardDescription className="truncate">
                          {item.client_name} • {item.year}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="shrink-0">
                        {categoryLabels[item.category]}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="flex-1"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </AdminLayout>
  );
}