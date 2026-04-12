import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  const whatsappNumber = "639673956481";
  const viberNumber = "639673956481";
  const email = "info@13mediaworks.com";

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="/13mediaworks_logo_alpha.png" 
              alt="13 Media Works" 
              className="h-16 w-auto"
            />
            <p className="text-sm text-muted-foreground">
              Professional video production and editing services for businesses worldwide.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-accent transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-accent transition-colors">
                  Live Event Coverage
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-accent transition-colors">
                  Documentary Production
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-muted-foreground hover:text-accent transition-colors">
                  Corporate AV Presentations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <a 
                  href={`mailto:${email}`}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a 
                    href={`tel:+${whatsappNumber}`}
                    className="text-muted-foreground hover:text-accent transition-colors block"
                  >
                    +{whatsappNumber}
                  </a>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline"
                    >
                      WhatsApp
                    </a>
                    <span className="text-muted-foreground">|</span>
                    <a
                      href={`viber://chat?number=%2B${viberNumber}`}
                      className="text-xs text-accent hover:underline"
                    >
                      Viber
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Digital Nomad<br />Worldwide Service
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold">Get Started</h3>
            <div className="space-y-3">
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/booking">
                  Book a Project
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to discuss a video project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 13 Media Works. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/booking" className="text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/booking" className="text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}