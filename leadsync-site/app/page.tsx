import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vsl from "./components/Vsl";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import CaseStudy from "./components/CaseStudy";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import TechStack from "./components/TechStack";
import Pricing from "./components/Pricing";
import About from "./components/About";
import Contact from "./components/Contact";
import FinalCta from "./components/FinalCta";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Vsl />
        <Problem />
        <Solution />
        <Services />
        <CaseStudy />
        <HowItWorks />
        <TechStack />
        <Pricing />
        <About />
        <FinalCta />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
