import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import HowItWorks from "../components/HowItWorks";
import Solution from "../components/Solution";
import Pricing from "../components/Pricing";
import FinalCta from "../components/FinalCta";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How a LeadSync engagement works: assess, agree scope, implement, then test and hand over, with the scope and price agreed before any build starts.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            How an engagement <span className="serif">works.</span>
          </>
        }
        lede="Four steps with the scope and price agreed first, an example of what an implementation looks like, and how projects are priced."
      />
      <HowItWorks />
      <Solution />
      <Pricing />
      <FinalCta />
    </>
  );
}
