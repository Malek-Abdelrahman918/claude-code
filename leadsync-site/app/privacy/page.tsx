import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import PrivacyPolicy from "../components/PrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What personal information LeadSync collects through this website, why, who it is shared with, how long it is kept, and your choices about cookies and advertising tracking.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Privacy <span className="serif">policy.</span>
          </>
        }
        lede="What this website collects, why, who handles it, and the choices you have. Written to be read."
      />
      <PrivacyPolicy />
    </>
  );
}
