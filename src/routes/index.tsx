import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/site/Preloader";
import { CustomCursor } from "@/components/site/CustomCursor";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Programs } from "@/components/site/Programs";
import { AICoach } from "@/components/site/AICoach";
import { Calculators } from "@/components/site/Calculators";
import { Membership } from "@/components/site/Membership";
import { Trainers } from "@/components/site/Trainers";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <AICoach />
        <Calculators />
        <Membership />
        <Trainers />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
