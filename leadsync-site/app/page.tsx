import Hero from "./components/Hero";
import {
  AboutTeaser,
  ProblemPreview,
  ProcessPreview,
  ServicesPreview,
  WorkPreview,
} from "./components/HomePreviews";
import FinalCta from "./components/FinalCta";

// Home: the headline and the VSL come first; everything after is a short preview that links
// to the page holding the full content.
export default function Home() {
  return (
    <>
      <Hero />
      <ProblemPreview />
      <ServicesPreview />
      <ProcessPreview />
      <WorkPreview />
      <AboutTeaser />
      <FinalCta />
    </>
  );
}
