import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const featuredWork = [
  {
    title: "Tech Startup Launch Video",
    category: "Video Editing",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=450&fit=crop",
    description: "90-second product launch with motion graphics and brand storytelling",
  },
  {
    title: "Music Festival Highlights",
    category: "Live Events",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=450&fit=crop",
    description: "Multi-camera coverage and same-day highlight reel delivery",
  },
  {
    title: "Environmental Documentary",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop",
    description: "20-minute short film on sustainable agriculture practices",
  },
];

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground">
            A curated selection of recent projects showcasing diverse storytelling and technical expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {featuredWork.map((project) => (
            <Card key={project.title} className="overflow-hidden bg-card border-border hover:border-accent/50 transition-all duration-300 group">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 space-y-3">
                <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                  {project.category}
                </Badge>
                
                <h3 className="font-serif text-xl font-semibold">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/portfolio">
            <Button size="lg" variant="outline" className="border-accent/30 hover:border-accent hover:bg-accent/10">
              View Full Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}