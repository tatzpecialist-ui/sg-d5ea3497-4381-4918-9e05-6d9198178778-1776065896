import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Video, 
  Camera, 
  Film, 
  Mic, 
  MapPin, 
  Clock, 
  Users,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function DocumentaryService() {
  const processSteps = [
    {
      number: "01",
      title: "Story Development",
      description: "We collaborate on the narrative arc, identify key subjects, and plan the shooting approach that serves your story.",
    },
    {
      number: "02",
      title: "Production",
      description: "Multi-location filming with professional cinema cameras, audio equipment, and skilled crew coordination.",
    },
    {
      number: "03",
      title: "Post-Production",
      description: "Expert editing, color grading, sound design, and music composition to create a compelling final film.",
    },
    {
      number: "04",
      title: "Delivery",
      description: "Final deliverables in all required formats for broadcast, streaming platforms, film festivals, or private screenings.",
    },
  ];

  const capabilities = [
    "Observational documentary",
    "Interview-based storytelling",
    "Investigative journalism",
    "Character-driven narratives",
    "Historical documentaries",
    "Social issue films",
    "Environmental documentaries",
    "Cultural & heritage projects",
    "Behind-the-scenes content",
    "Documentary series",
  ];

  const equipment = [
    { icon: Camera, text: "Cinema cameras (4K-8K)" },
    { icon: Mic, text: "Professional audio recording" },
    { icon: Film, text: "Drone cinematography" },
    { icon: Video, text: "Stabilization systems" },
  ];

  return (
    <>
      <SEO
        title="Documentary Production - 13 Media Works"
        description="Story-driven documentary filmmaking. From concept to final cut, bringing authentic narratives to life with cinematic quality."
      />
      
      <Navigation />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-background to-card/30">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                Documentary Production
              </Badge>
              
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                Stories That Move, Inspire, and Endure
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Documentary filmmaking is about truth, authenticity, and the human experience. Whether it's capturing cultural heritage, investigating social issues, or profiling extraordinary individuals, we craft narratives that resonate deeply and stand the test of time.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    Start Your Documentary Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline">
                    View Documentary Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* From Paper to Screen Section */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
                  Our Approach
                </Badge>
                <h2 className="font-serif text-4xl font-bold mb-6">
                  From Paper to Screen
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Every powerful documentary begins long before the camera rolls. We immerse ourselves in intensive research, uncovering the heart of your story through interviews, archival exploration, and deep subject matter analysis.
                  </p>
                  <p>
                    Our scriptwriting process transforms raw research into narrative architecture—crafting compelling story arcs that guide viewers through complex subjects with clarity and emotional resonance.
                  </p>
                  <p>
                    During production, we capture authentic moments with cinematic precision, combining observational techniques with carefully planned sequences. In post-production, we sculpt footage into a cohesive narrative that entertains, educates, informs, and moves audiences.
                  </p>
                  <p className="font-semibold text-foreground">
                    The result: documentaries that don't just tell stories—they change perspectives.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop" 
                    alt="Documentary filmmaker interviewing subject in natural light"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-lg -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* What We Deliver */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4">
                What We Deliver
              </h2>
              <p className="text-lg text-muted-foreground">
                Full-service documentary production from pre-production research through final delivery
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {equipment.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 text-center bg-card border-border hover:border-accent/50 transition-colors">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <p className="font-medium">{item.text}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Production Process */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Our Production Process
              </h2>
              <p className="text-lg text-muted-foreground">
                A collaborative journey from concept to completion
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {processSteps.map((step) => (
                <Card key={step.number} className="p-8 bg-background border-border">
                  <div className="flex items-start gap-6">
                    <div className="text-5xl font-serif font-bold text-accent/20 select-none">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documentary Types */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4">
                Documentary Capabilities
              </h2>
              <p className="text-lg text-muted-foreground">
                Versatile storytelling across multiple documentary formats
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent/50 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="font-medium">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-card/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Global Reach</h3>
                  <p className="text-muted-foreground">
                    Based anywhere, filming everywhere. Remote coordination and on-location expertise.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Authentic Stories</h3>
                  <p className="text-muted-foreground">
                    We build trust with subjects to capture genuine, unguarded moments.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold">Efficient Workflow</h3>
                  <p className="text-muted-foreground">
                    Decades of experience ensure smooth production and post-production timelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-accent/5">
          <div className="container">
            <Card className="max-w-4xl mx-auto p-12 text-center bg-card border-accent/20">
              <h2 className="font-serif text-4xl font-bold mb-6">
                Ready to Tell Your Story?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every documentary begins with a conversation. Share your vision, and let's explore how we can bring it to life.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" className="bg-accent hover:bg-accent/90">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}