import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Video, Radio, Camera, Zap, ArrowRight, CheckCircle2, MonitorPlay, Users, Globe } from "lucide-react";
import Link from "next/link";

export default function LiveEventsPage() {
  const equipment = [
    { icon: Camera, title: "PTZ Cameras", description: "Pan-Tilt-Zoom cameras for dynamic multi-angle coverage" },
    { icon: Video, title: "Broadcast Switchers", description: "Professional live switching for seamless multi-camera production" },
    { icon: Radio, title: "Wireless Audio", description: "Crystal-clear sound capture with professional lavalier & boom mics" },
    { icon: MonitorPlay, title: "Live Streaming", description: "Real-time broadcast to YouTube, Vimeo, and custom RTMP destinations" }
  ];

  const eventTypes = [
    "Corporate conferences & summits",
    "Product launches & brand activations",
    "Concerts & music festivals",
    "Sports events & tournaments",
    "Weddings & celebrations",
    "Panel discussions & interviews",
    "Workshops & training sessions",
    "Award ceremonies & galas"
  ];

  const capabilities = [
    "Multi-camera setups (2-8 cameras)",
    "Professional PTZ camera systems",
    "Live switching & graphics overlay",
    "Real-time color correction",
    "Wireless audio systems",
    "LED lighting packages",
    "Live streaming to multiple platforms",
    "Same-day highlight reels"
  ];

  return (
    <>
      <SEO 
        title="Live Event Video Production | 13 Media Works"
        description="Professional live event coverage with PTZ cameras and broadcast-grade equipment. Capture your event with cinematic precision."
      />
      
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-background via-background to-card overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 text-sm px-4 py-2">
                Live Event Coverage
              </Badge>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Capture Every Moment With Broadcast Precision
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Professional multi-camera live event production using PTZ cameras and industry-grade equipment. From intimate gatherings to large-scale conferences, we deliver flawless coverage.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background font-semibold">
                    Book Coverage
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
                    Watch Event Highlights
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PTZ Camera Technology Section */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                  Industry-Grade Equipment
                </Badge>
                <h2 className="font-serif text-4xl font-bold mb-6">
                  PTZ Cameras & Professional Broadcast Gear
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Our PTZ (Pan-Tilt-Zoom) camera systems provide unparalleled flexibility for live event coverage. Remotely controlled with precision optics, these broadcast-grade cameras capture dynamic angles without the need for multiple operators.
                  </p>
                  <p>
                    We deploy professional switchers, wireless audio systems, and LED lighting packages to ensure every moment is captured with cinematic quality—whether it's a keynote speaker at a 5,000-person conference or an intimate workshop session.
                  </p>
                  <p className="font-semibold text-foreground">
                    The result: broadcast-quality coverage that preserves the energy and impact of your live event.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" 
                    alt="Professional PTZ camera setup at live conference event"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-lg -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Capabilities */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Professional Production Capabilities
              </h2>
              <p className="text-muted-foreground text-lg">
                Broadcast-grade equipment for events of any scale
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {equipment.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-accent/10 bg-card/50">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Events We Cover
                </h2>
                <p className="text-muted-foreground text-lg">
                  From intimate workshops to large-scale productions
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {eventTypes.map((type, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-accent/10">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Production Process */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Our Production Workflow
                </h2>
                <p className="text-muted-foreground text-lg">
                  Seamless coverage from pre-production to final delivery
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Users,
                    title: "Pre-Event Planning",
                    description: "Site survey, camera placement strategy, audio requirements, and run-of-show coordination with your event team."
                  },
                  {
                    icon: Camera,
                    title: "Setup & Testing",
                    description: "Early arrival for equipment setup, camera calibration, audio checks, and network configuration for live streaming."
                  },
                  {
                    icon: Zap,
                    title: "Live Production",
                    description: "Real-time switching between PTZ cameras, graphics overlay, audio mixing, and simultaneous multi-platform streaming."
                  },
                  {
                    icon: Video,
                    title: "Post-Event Delivery",
                    description: "Same-day highlight reels, full-length edited recordings, and raw footage archival—delivered in formats ready for distribution."
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

        {/* Technical Capabilities */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Technical Specifications
                </h2>
                <p className="text-muted-foreground text-lg">
                  Professional equipment for broadcast-quality results
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {capabilities.map((item, index) => (
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
                Why Trust Us With Your Event
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <Camera className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Proven Technology</h3>
                  <p className="text-sm text-muted-foreground">
                    PTZ cameras and broadcast switchers used by networks and production companies worldwide
                  </p>
                </div>
                <div>
                  <Zap className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Zero Downtime</h3>
                  <p className="text-sm text-muted-foreground">
                    Redundant systems and backup equipment ensure your event is never interrupted
                  </p>
                </div>
                <div>
                  <Globe className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Global Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    As digital nomads, we've covered events across continents with consistent quality
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
                Make Your Event Unforgettable
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss your event coverage needs and create a production plan
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background font-semibold">
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
                    View Past Events
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