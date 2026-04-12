import { Navigation } from "@/components/Navigation";
import { BookingForm } from "@/components/BookingForm";
import { SEO } from "@/components/SEO";

export default function BookingPage() {
  return (
    <>
      <SEO 
        title="Book a Project - 13 Media Works"
        description="Start your video production project with 13 Media Works. Remote editing, live events, documentary, and corporate AV services."
        url="https://13mediaworks.com/booking"
      />
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Start Your Project
              </h1>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours to discuss your vision.
              </p>
            </div>
            
            <BookingForm />
          </div>
        </div>
      </main>
    </>
  );
}