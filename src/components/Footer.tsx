import Link from "next/link";
import { Mail, Phone, MapPin, Youtube, Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary/95 border-t border-border/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-accent">
              13 Media Works
            </h3>
            <p className="text-muted-foreground mb-4">
              Professional media production for businesses worldwide. Video editing, live events, documentary, and corporate AV presentations.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@13mediaworks26"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-accent/20 hover:text-accent transition-all duration-300 border border-border/50 hover:border-accent/50"
                aria-label="YouTube Channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/13mediawork/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-accent/20 hover:text-accent transition-all duration-300 border border-border/50 hover:border-accent/50"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/13MediaWorks/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-accent/20 hover:text-accent transition-all duration-300 border border-border/50 hover:border-accent/50"
                aria-label="Facebook Page"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Book a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Video Editing</li>
              <li>Live Event Coverage</li>
              <li>Documentary Production</li>
              <li>Corporate AV Presentations</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} 13 Media Works. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="mailto:info@13mediaworks.com"
              className="hover:text-accent transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              info@13mediaworks.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}