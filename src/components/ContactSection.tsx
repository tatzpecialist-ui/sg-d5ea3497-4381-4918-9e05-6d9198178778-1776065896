import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  const whatsappNumber = "639673956481";
  const viberNumber = "639673956481";
  const email = "info@13mediaworks.com";

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Let's Create Something <span className="text-accent">Extraordinary</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to bring your vision to life? Get in touch with us today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Email */}
          <Card className="p-6 bg-card border-border hover:border-accent transition-all group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Send us your project details
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full group-hover:border-accent group-hover:text-accent"
                >
                  <a href={`mailto:${email}`}>
                    <Send className="h-4 w-4 mr-2" />
                    {email}
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* WhatsApp */}
          <Card className="p-6 bg-card border-border hover:border-accent transition-all group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <MessageCircle className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick chat for urgent inquiries
                </p>
                <Button 
                  asChild 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to discuss a video project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Phone / Viber */}
          <Card className="p-6 bg-card border-border hover:border-accent transition-all group">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Phone className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold mb-2">Call / Viber</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak with us directly
                </p>
                <div className="space-y-2">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full group-hover:border-accent group-hover:text-accent"
                  >
                    <a href={`tel:+${whatsappNumber}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      +{whatsappNumber}
                    </a>
                  </Button>
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm"
                    className="w-full text-accent hover:text-accent hover:bg-accent/10"
                  >
                    <a href={`viber://chat?number=%2B${viberNumber}`}>
                      Open in Viber
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Or fill out our detailed booking form
          </p>
          <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Link href="/booking">
              Complete Booking Form
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}