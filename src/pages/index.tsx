import { Hero } from "@/components/Hero";
import { ServicesOverview } from "@/components/ServicesOverview";
import { PortfolioPreview } from "@/components/PortfolioPreview";
import { ContactSection } from "@/components/ContactSection";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO 
        title="13 Media Works - Professional Video Production & Editing"
        description="Remote video editing, live event coverage, documentary production, and corporate AV presentations by a digital nomad creative professional."
        url="https://13mediaworks.com"
      />
      <Navigation />
      <main>
        <Hero />
        <ServicesOverview />
        <PortfolioPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}