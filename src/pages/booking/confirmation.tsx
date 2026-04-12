import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { bookingService } from "@/services/bookingService";
import { SEO } from "@/components/SEO";
import type { Database } from "@/integrations/supabase/types";
import { Footer } from "@/components/Footer";

type Booking = Database["public"]["Tables"]["bookings"]["Row"];

export default function BookingConfirmation() {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === "string") {
      loadBooking(id);
    }
  }, [id]);

  const loadBooking = async (bookingId: string) => {
    try {
      const data = await bookingService.getBookingById(bookingId);
      setBooking(data);
    } catch (error) {
      console.error("Error loading booking:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </main>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Booking Confirmed - 13 Media Works"
        description="Your project booking has been submitted successfully."
        url="https://13mediaworks.com/booking/confirmation"
      />
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-card border-border text-center space-y-6">
              <div className="flex justify-center">
                <CheckCircle2 className="h-20 w-20 text-accent" />
              </div>
              
              <div className="space-y-2">
                <h1 className="font-serif text-3xl md:text-4xl font-bold">
                  Booking Submitted Successfully!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Thank you for choosing 13 Media Works
                </p>
              </div>

              {booking && (
                <div className="space-y-4 text-left bg-secondary/50 p-6 rounded-lg">
                  <h2 className="font-serif text-xl font-semibold mb-4">Booking Details</h2>
                  
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference ID:</span>
                      <span className="font-medium">{booking.id.slice(0, 8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium capitalize">{booking.service_type.replace("_", " ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contact:</span>
                      <span className="font-medium">{booking.client_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium capitalize text-accent">{booking.status}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <p className="text-muted-foreground">
                  We've received your project request and will contact you within 24 hours to discuss next steps. Check your email for confirmation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <Link href="/">
                    <Button variant="outline" className="border-accent/30 hover:border-accent hover:bg-accent/10">
                      Return Home
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                      View Our Work
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}