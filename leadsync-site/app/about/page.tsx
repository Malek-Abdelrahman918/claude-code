import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import About from "../components/About";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "LeadSync is a founder-led AI implementation consultancy. Who is behind it, where it is today, and how to get in touch.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            About <span className="serif">LeadSync.</span>
          </>
        }
        lede="A founder-led AI implementation consultancy: who is behind it, where it is today, and how to get in touch."
      />
      <About />
      <Contact />
    </>
  );
}
