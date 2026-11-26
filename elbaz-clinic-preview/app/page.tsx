import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Why } from "@/components/Why";
import { Journey } from "@/components/Journey";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ar } from "@/content/ar";
import { clinic } from "@/content/clinic";

/*
 * Testimonials are intentionally omitted: no patient review could be verified
 * at its source. Add a section here only with reviews whose wording and origin
 * (e.g. Google reviews) are confirmed.
 */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: ar.meta.title,
  description: ar.meta.description,
  medicalSpecialty: "PhysicalTherapy",
  address: {
    "@type": "PostalAddress",
    addressLocality: "الشيخ زايد",
    addressRegion: "الجيزة",
    addressCountry: "EG",
    ...(clinic.streetAddress ? { streetAddress: clinic.streetAddress } : {}),
  },
  ...(clinic.phone ? { telephone: `+${clinic.phone}` } : {}),
};

export default function Page() {
  return (
    <>
      <a href="#main" className="skip-link">تخطَّ إلى المحتوى</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Why />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
