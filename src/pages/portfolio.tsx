import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { portfolioService, getYouTubeThumbnail } from "@/services/portfolioService";
import type { PortfolioItem } from "@/services/portfolioService";
import { ArrowLeft, Play, X } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    loadItems();
  }, [selectedCategory]);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await portfolioService.getAllItems(selectedCategory);
      setItems(data);
    } catch (error) {
      console.error("Error loading portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: "all", label: "All Work" },
    { id: "video-editing", label: "Video Editing" },
    { id: "live-events", label: "Live Events" },
    { id: "documentary", label: "Documentary" },
    { id: "corporate-av", label: "Corporate AV" },
  ];

  const categoryLabels: Record<string, string> = {
    "video-editing": "Video Editing",
    "live-events": "Live Events",
    "documentary": "Documentary",
    "corporate-av": "Corporate AV",
  };

  return (
    <>
      <SEO
        title="Portfolio - 13 Media Works"
        description="Explore our portfolio of video editing, live event coverage, documentary production, and corporate AV presentations."
      />
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <Link href="/">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Showcasing our finest work in video production, editing, and live coverage
              across the globe.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-accent hover:bg-accent/90"
                    : ""
                }
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading portfolio...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No portfolio items found in this category.
              </p>
              <Link href="/admin/portfolio">
                <Button variant="outline">Add Your First Project</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedVideo(item)}
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-4 bg-card">
                    <img
                      src={getYouTubeThumbnail(item.video_id)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-accent/50">
                        <Play className="h-8 w-8 text-black ml-1" />
                      </div>
                    </div>

                    {/* Featured Badge */}
                    {item.is_featured && (
                      <Badge className="absolute top-3 right-3 bg-accent">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <Badge variant="outline" className="shrink-0">
                        {categoryLabels[item.category]}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {item.client_name} • {item.year}
                    </p>
                    
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let's bring your vision to life with professional video production
                and editing services.
              </p>
              <Link href="/booking">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl font-serif">
                  {selectedVideo?.title}
                </DialogTitle>
                <DialogDescription className="mt-1">
                  {selectedVideo?.client_name} • {selectedVideo?.year} •{" "}
                  {selectedVideo && categoryLabels[selectedVideo.category]}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedVideo(null)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedVideo && (
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.video_id}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
          
          {selectedVideo?.description && (
            <div className="p-6 pt-4">
              <h3 className="font-semibold mb-2">About This Project</h3>
              <p className="text-muted-foreground">{selectedVideo.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}