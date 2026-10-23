import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BOOKING_PATH } from "../lib/config";

export default function FinalCta() {
  return (
    <section id="final-cta" className="section final on-dark" aria-labelledby="final-title">
      <div className="wrap final__grid">
        <h2 id="final-title" className="h2">
          Find Out Where AI Could <span className="serif">Save Your Business Time.</span>
        </h2>
        <div className="final__body">
          <p className="lede">
            Book a discovery call to discuss your operations, identify potential opportunities, and
            determine whether LeadSync is a good fit.
          </p>
          <Link className="btn btn--lg" href={BOOKING_PATH}>
            Book a Discovery Call <ArrowRight size={18} className="arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
