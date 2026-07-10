import { HeroSection } from "@/components/store/home/HeroSection";
import { StatsIndicators } from "@/components/store/home/StatsIndicators";
import { ProblemsSolved } from "@/components/store/home/ProblemsSolved";
import { HowItWorks } from "@/components/store/home/HowItWorks";
import { Technologies } from "@/components/store/home/Technologies";
import { BenefitsCards } from "@/components/store/home/BenefitsCards";
import { ProductShowcase } from "@/components/store/home/ProductShowcase";
import { SocialProof } from "@/components/store/home/SocialProof";
import { ResultsGallery } from "@/components/store/home/ResultsGallery";
import { VideosSection } from "@/components/store/home/VideosSection";
import { FAQAccordion } from "@/components/store/home/FAQAccordion";
import { FinalCTA } from "@/components/store/home/FinalCTA";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getPublishedFaqs } from "@/lib/queries";

export default async function Home() {
  const faqs = await getPublishedFaqs();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Header />
      <HeroSection />
      <StatsIndicators />
      <ProblemsSolved />
      <HowItWorks />
      <Technologies />
      <BenefitsCards />
      <ProductShowcase />
      <SocialProof />
      <ResultsGallery />
      <VideosSection />
      <FAQAccordion faqs={faqs} />
      <FinalCTA />
      <Footer />
    </main>
  );
}
