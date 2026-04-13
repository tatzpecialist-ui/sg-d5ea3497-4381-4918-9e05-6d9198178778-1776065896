import { Mail, Phone, MapPin, Send, Youtube, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Let's Create Together
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to bring your vision to life? Get in touch and let's discuss your next project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href="mailto:info@13mediaworks.com"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    info@13mediaworks.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Digital Nomad - Serving Clients Worldwide
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold mb-3">Follow My Work</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/@13mediaworks26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300 border border-accent/20 hover:border-accent/50 group"
                >
                  <Youtube className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium group-hover:text-accent transition-colors">
                    YouTube
                  </span>
                </a>
                <a
                  href="https://www.instagram.com/13mediawork/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300 border border-accent/20 hover:border-accent/50 group"
                >
                  <Instagram className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium group-hover:text-accent transition-colors">
                    Instagram
                  </span>
                </a>
                <a
                  href="https://www.facebook.com/13MediaWorks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300 border border-accent/20 hover:border-accent/50 group"
                >
                  <Facebook className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium group-hover:text-accent transition-colors">
                    Facebook
                  </span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 rounded-lg border border-accent/20">
              <h3 className="font-semibold mb-2">Response Time</h3>
              <p className="text-muted-foreground text-sm">
                I typically respond within 24 hours. For urgent projects, please mention it in your message.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-card p-8 rounded-lg border border-border flex flex-col justify-center">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-muted-foreground mb-6">
              From concept to completion, I'll help you create professional media content that stands out.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <span className="text-sm">Professional video editing & post-production</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <span className="text-sm">Live event coverage & documentary filming</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <span className="text-sm">Corporate presentations & AV solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                </div>
                <span className="text-sm">Flexible remote collaboration worldwide</span>
              </li>
            </ul>
            <Link href="/booking">
              <Button className="w-full bg-accent hover:bg-accent/90 text-background font-semibold group">
                <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}