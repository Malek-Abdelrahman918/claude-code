import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Problem from "../components/Problem";
import Services from "../components/Services";
import TechStack from "../components/TechStack";
import FinalCta from "../components/FinalCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "The operational problems LeadSync starts with, the AI implementation services it offers, and the tools it works with.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            What LeadSync <span className="serif">can build.</span>
          </>
        }
        lede="The operational problems LeadSync starts with, the services on offer, and the tools involved."
      />
      <Problem />
      <Services />
      <TechStack />
      <FinalCta />
    </>
  );
}
