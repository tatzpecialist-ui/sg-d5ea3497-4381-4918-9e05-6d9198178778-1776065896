import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Banner Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/13mediaworks_banner.png"
          alt="13 Media Works Editing Suite"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>
      
      {/* Cyan glow effect matching logo */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-40" />
      
      <div className="container relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight">
            Cinematic Stories,
            <br />
            <span className="text-accent drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]">
              Masterfully Crafted
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional video editing, live event coverage, documentary production, and corporate AV presentations — delivered worldwide by a digital nomad creative.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/booking">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all">
                Start a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-accent/30 hover:border-accent hover:bg-accent/10 text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                View Portfolio
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">150+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">25+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}