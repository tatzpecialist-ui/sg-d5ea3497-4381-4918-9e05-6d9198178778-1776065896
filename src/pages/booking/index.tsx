import { Navigation } from "@/components/Navigation";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function BookingPage() {
  return (
    <>
      <SEO 
        title="Book a Project - 13 Media Works"
        description="Request video production services - editing, live events, documentary, or corporate AV presentations."
        url="https://13mediaworks.com/booking"
      />
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="container py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Book Your <span className="text-accent">Project</span>
              </h1>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>
       
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}