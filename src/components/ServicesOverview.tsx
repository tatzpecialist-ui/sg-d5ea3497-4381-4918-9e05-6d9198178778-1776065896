import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Video, Camera, Presentation, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Film,
    title: "Video Editing",
    description: "Transform raw footage into polished, engaging content. Color grading, motion graphics, and seamless post-production.",
    href: "/services/video-editing",
  },
  {
    icon: Camera,
    title: "Live Events",
    description: "Multi-camera coverage for conferences, concerts, and ceremonies. Real-time streaming and professional cinematography.",
    href: "/services/live-events",
  },
  {
    icon: Video,
    title: "Documentary",
    description: "Story-driven visual narratives. From concept to final cut, bringing authentic stories to life.",
    href: "/services/documentary",
  },
  {
    icon: Presentation,
    title: "Corporate AV",
    description: "Executive presentations, training videos, and brand storytelling. Elevate your corporate communications.",
    href: "/services/corporate-av",
  },
];

export function ServicesOverview() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Services Tailored to Your Vision
          </h2>
          <p className="text-lg text-muted-foreground">
            From remote editing workflows to on-location filming, I deliver broadcast-quality results wherever your story takes us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="p-8 bg-card border-border hover:border-accent/50 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  
                  <h3 className="font-serif text-2xl font-semibold">{service.title}</h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Link href={service.href}>
                    <Button variant="ghost" className="p-0 h-auto text-accent hover:text-accent/80 hover:bg-transparent font-medium">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}