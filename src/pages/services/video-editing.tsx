import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Film, Palette, Scissors, Sparkles, ArrowRight, CheckCircle2, Cpu, Users, Clock } from "lucide-react";
import Link from "next/link";

export default function VideoEditingPage() {
  const capabilities = [
    { icon: Film, title: "Color Grading", description: "Professional color correction and grading in DaVinci Resolve" },
    { icon: Scissors, title: "Narrative Editing", description: "Compelling storytelling through precise cuts and pacing" },
    { icon: Sparkles, title: "Motion Graphics", description: "Dynamic titles, transitions, and visual effects" },
    { icon: Palette, title: "Visual Polish", description: "Refined finishing touches that elevate production value" }
  ];

  const software = [
    "DaVinci Resolve Studio",
    "Adobe Premiere Pro",
    "After Effects",
    "Final Cut Pro X",
    "Avid Media Composer",
    "DaVinci Fusion"
  ];

  const deliverables = [
    "Multiple format exports (web, social media, broadcast)",
    "Color-corrected & graded footage",
    "Synchronized multi-camera edits",
    "Audio mixing & noise reduction",
    "Motion graphics & titles",
    "Archival project files"
  ];

  return (
    <>
      <SEO 
        title="Professional Video Editing Services | 13 Media Works"
        description="Expert video editing using DaVinci Resolve and industry-standard tools. Transform raw footage into polished, engaging content."
      />
      
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-background via-background to-card overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 text-sm px-4 py-2">
                Professional Video Editing
              </Badge>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Transform Raw Footage Into Polished Masterpieces
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Expert video editing powered by DaVinci Resolve and industry-standard tools. Our reliable editors craft narratives that captivate, engage, and deliver results.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background font-semibold">
                    Request Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Industry-Standard Tools Section */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=450&fit=crop" 
                    alt="Professional video editor working on DaVinci Resolve color grading"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/10 rounded-lg -z-10" />
              </div>

              <div>
                <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                  Professional Tools
                </Badge>
                <h2 className="font-serif text-4xl font-bold mb-6">
                  Powered by DaVinci Resolve & Industry-Leading Software
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-8">
                  <p>
                    We leverage DaVinci Resolve Studio—the industry's gold standard for color grading and finishing—alongside a comprehensive suite of professional editing tools.
                  </p>
                  <p>
                    Our team of reliable, experienced editors combines technical expertise with creative vision, ensuring every frame serves your story. From narrative pacing to color science, we handle every aspect of post-production with precision.
                  </p>
                  <p className="font-semibold text-foreground">
                    The result: polished, broadcast-quality content that stands out in any medium.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {software.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editing Capabilities */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Comprehensive Editing Services
              </h2>
              <p className="text-muted-foreground text-lg">
                From rough cuts to final color grade, we transform your footage into engaging visual stories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-accent/10 bg-card/50">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{capability.title}</h3>
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Editing Process */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Our Editing Workflow
                </h2>
                <p className="text-muted-foreground text-lg">
                  A proven process that delivers exceptional results on time
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Cpu,
                    title: "Ingest & Organization",
                    description: "We organize your footage, create proxies for smooth editing, and establish a structured project timeline."
                  },
                  {
                    icon: Scissors,
                    title: "Assembly & Rough Cut",
                    description: "Building the narrative foundation with selects, pacing, and story structure. Multiple revision rounds ensure we're aligned."
                  },
                  {
                    icon: Palette,
                    title: "Fine Cut & Color Grade",
                    description: "Refined editing with transitions, effects, and professional color grading in DaVinci Resolve for cinematic impact."
                  },
                  {
                    icon: Sparkles,
                    title: "Finishing & Delivery",
                    description: "Audio mixing, motion graphics, final QC, and delivery in all required formats—optimized for web, social, or broadcast."
                  }
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  What You Receive
                </h2>
                <p className="text-muted-foreground text-lg">
                  Professional deliverables ready for any platform
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-accent/10">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-accent/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold mb-6">
                Why Work With Us
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <Users className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Reliable Editors</h3>
                  <p className="text-sm text-muted-foreground">
                    Experienced professionals who deliver quality work consistently and on schedule
                  </p>
                </div>
                <div>
                  <Cpu className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Cutting-Edge Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Latest versions of DaVinci Resolve and industry-standard editing software
                  </p>
                </div>
                <div>
                  <Clock className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Fast Turnaround</h3>
                  <p className="text-sm text-muted-foreground">
                    Efficient workflows that meet tight deadlines without compromising quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Ready to Elevate Your Content?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss your project and create something exceptional together
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background font-semibold">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}