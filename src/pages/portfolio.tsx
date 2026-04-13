import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ServiceType = "all" | "video-editing" | "live-events" | "documentary" | "corporate-av";

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: ServiceType;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  duration?: string;
  year: string;
}

// Sample portfolio items - replace with your actual projects
const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Corporate Brand Story",
    client: "Tech Innovations Inc.",
    category: "video-editing",
    description: "60-second brand narrative showcasing company culture and innovation",
    thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80",
    duration: "1:00",
    year: "2024"
  },
  {
    id: "2",
    title: "Product Launch Event Coverage",
    client: "Global Electronics",
    category: "live-events",
    description: "Multi-camera coverage of international product unveiling",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    duration: "15:30",
    year: "2024"
  },
  {
    id: "3",
    title: "Artisan Craft Documentary",
    client: "Heritage Foundation",
    category: "documentary",
    description: "30-minute documentary on traditional craftsmanship preservation",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
    duration: "30:00",
    year: "2023"
  },
  {
    id: "4",
    title: "Annual Conference Highlights",
    client: "Business Leaders Forum",
    category: "corporate-av",
    description: "Executive presentation and keynote speech compilation",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    duration: "8:45",
    year: "2024"
  },
  {
    id: "5",
    title: "Travel Series - Southeast Asia",
    client: "Adventure Network",
    category: "documentary",
    description: "6-episode travel documentary series across 5 countries",
    thumbnail: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
    duration: "45:00",
    year: "2023"
  },
  {
    id: "6",
    title: "Wedding Ceremony Film",
    client: "Private Commission",
    category: "live-events",
    description: "Cinematic wedding film with drone footage and interviews",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    duration: "12:00",
    year: "2024"
  },
];

const categories = [
  { value: "all" as ServiceType, label: "All Projects" },
  { value: "video-editing" as ServiceType, label: "Video Editing" },
  { value: "live-events" as ServiceType, label: "Live Events" },
  { value: "documentary" as ServiceType, label: "Documentary" },
  { value: "corporate-av" as ServiceType, label: "Corporate AV" },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ServiceType>("all");

  const filteredItems = activeCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <>
      <SEO 
        title="Portfolio - 13 Media Works"
        description="Explore our portfolio of video editing, live event coverage, documentary production, and corporate AV presentations."
        url="https://13mediaworks.com/portfolio"
      />
      <Navigation />
      
      <main className="min-h-screen py-24">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <Link href="/">
              <Button variant="ghost" className="mb-6 hover:text-accent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="font-serif font-bold text-5xl md:text-6xl mb-4">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A curated collection of video projects spanning multiple continents and industries.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                onClick={() => setActiveCategory(category.value)}
                className={
                  activeCategory === category.value
                    ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                    : "border-accent/30 hover:border-accent hover:bg-accent/10"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-border hover:border-accent/50 transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  {/* Thumbnail */}
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.5)]">
                      <Play className="h-8 w-8 text-accent-foreground ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {item.duration && (
                    <Badge className="absolute top-3 right-3 bg-background/80 text-foreground border-border">
                      {item.duration}
                    </Badge>
                  )}
                </div>

                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-semibold text-xl group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-muted-foreground shrink-0">{item.year}</span>
                  </div>
                  
                  <p className="text-sm text-accent font-medium">
                    {item.client}
                  </p>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <Badge variant="outline" className="text-xs border-accent/30">
                      {categories.find(c => c.value === item.category)?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-24">
              <p className="text-xl text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your next video project and bring your vision to life.
            </p>
            <Link href="/booking">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-[0_0_30px_rgba(0,212,255,0.3)]">
                Start a Project
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}