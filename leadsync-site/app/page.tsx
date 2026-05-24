import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import CaseStudy from "./components/CaseStudy";
import TechStack from "./components/TechStack";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Services />
        <CaseStudy />
        <TechStack />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
