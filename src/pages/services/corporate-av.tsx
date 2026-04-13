import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { Presentation, Briefcase, TrendingUp, Award, ArrowRight, CheckCircle2, Sparkles, Users, Building2 } from "lucide-react";
import Link from "next/link";

export default function CorporateAVPage() {
  const services = [
    { icon: Presentation, title: "Executive Presentations", description: "Polished videos that command attention in boardrooms and conferences" },
    { icon: Briefcase, title: "Brand Films", description: "Cinematic narratives that elevate your corporate identity" },
    { icon: TrendingUp, title: "Product Showcases", description: "Professional videos that make your products shine" },
    { icon: Award, title: "Corporate Training", description: "Engaging educational content that looks as good as it teaches" }
  ];

  const brandElements = [
    "On-brand color grading & styling",
    "Professional motion graphics & titles",
    "Executive-level production quality",
    "Consistent visual language across all content",
    "Premium finishing & polish",
    "Multi-platform optimization"
  ];

  const deliverables = [
    "Keynote & presentation videos",
    "Company culture & values films",
    "Investor pitch decks",
    "Annual reports & shareholder communications",
    "Employee onboarding & training modules",
    "Product demonstration videos",
    "Trade show & event content",
    "Social media brand content"
  ];

  return (
    <>
      <SEO 
        title="Corporate Audio Visual Production | 13 Media Works"
        description="Professional corporate AV presentations that make your brand look exceptional. Polished, on-brand content for executives and enterprise."
      />
      
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-background via-background to-card overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3lhbiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 text-sm px-4 py-2">
                Corporate Audio Visual
              </Badge>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Make Your Brand Look Exceptional
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Professional corporate AV production that elevates your brand presence. From executive presentations to investor communications, we make your company look polished, credible, and world-class.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background font-semibold">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
                    View Corporate Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Excellence Section */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                  Brand-First Approach
                </Badge>
                <h2 className="font-serif text-4xl font-bold mb-6">
                  Your Brand, Elevated to Perfection
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We don't just create corporate videos—we craft visual experiences that make your brand look <strong className="text-foreground">professional, credible, and world-class</strong>. Every frame is designed to reinforce your corporate identity and command respect.
                  </p>
                  <p>
                    From color grading that matches your brand palette to motion graphics that echo your visual language, we ensure every element is meticulously aligned with your corporate standards. The result is content that looks like it came from a Fortune 500 production studio.
                  </p>
                  <p className="font-semibold text-foreground">
                    When stakeholders see your content, they see a company that invests in excellence.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop" 
                    alt="Professional corporate presentation in modern boardroom"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-lg -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Services */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Corporate AV Services
              </h2>
              <p className="text-muted-foreground text-lg">
                Professional production for every corporate communication need
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-accent/10 bg-card/50">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brand Consistency */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Obsessive Attention to Brand Detail
                </h2>
                <p className="text-muted-foreground text-lg">
                  Every element refined to reflect your corporate excellence
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {brandElements.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-accent/10">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
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
                  White-Glove Production Process
                </h2>
                <p className="text-muted-foreground text-lg">
                  Professional service from concept to final delivery
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Users,
                    title: "Brand Discovery",
                    description: "We study your brand guidelines, visual identity, and corporate messaging to ensure perfect alignment with your standards."
                  },
                  {
                    icon: Sparkles,
                    title: "Concept & Scripting",
                    description: "Professional scriptwriting and storyboarding that balances corporate messaging with engaging visual storytelling."
                  },
                  {
                    icon: Presentation,
                    title: "Production & Filming",
                    description: "High-end production with professional lighting, camera work, and audio—everything shot to executive standards."
                  },
                  {
                    icon: Building2,
                    title: "Brand-Perfect Finishing",
                    description: "Meticulous color grading, motion graphics, and editing that makes your brand look premium and polished."
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

        {/* What We Deliver */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl font-bold mb-4">
                  Corporate Content We Create
                </h2>
                <p className="text-muted-foreground text-lg">
                  Professional deliverables for every corporate need
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {deliverables.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card/30 border border-accent/10">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Premium Matters */}
        <section className="py-20 bg-gradient-to-br from-accent/5 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-4xl font-bold mb-6">
                Why Production Quality Matters for Your Brand
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div>
                  <Award className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Credibility Signal</h3>
                  <p className="text-sm text-muted-foreground">
                    High-production content instantly communicates professionalism and enterprise-level quality
                  </p>
                </div>
                <div>
                  <TrendingUp className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Competitive Edge</h3>
                  <p className="text-sm text-muted-foreground">
                    Stand out from competitors with content that looks premium and polished
                  </p>
                </div>
                <div>
                  <Building2 className="h-10 w-10 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Brand Consistency</h3>
                  <p className="text-sm text-muted-foreground">
                    Maintain visual excellence across all stakeholder communications
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
                Ready to Elevate Your Corporate Presence?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's create content that makes your brand look exceptional
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-background font-semibold">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
                    View Corporate Portfolio
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