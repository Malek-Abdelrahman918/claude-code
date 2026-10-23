import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import WorkExample from "../components/WorkExample";
import CaseStudy from "../components/CaseStudy";
import FinalCta from "../components/FinalCta";

export const metadata: Metadata = {
  title: "Case studies and demo",
  description:
    "LeadSync is early-stage and has no client case studies yet. See an illustrative demonstration of the kind of system it builds.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        idx="01"
        label="Work so far"
        title={
          <>
            No client case studies yet. <span className="serif">One demo to show.</span>
          </>
        }
        lede="LeadSync is early-stage, so there are no client results to publish. What follows is an illustrative demonstration, using fictional data, of the kind of system it builds."
      />
      <WorkExample />
      <CaseStudy />
      <FinalCta />
    </>
  );
}
