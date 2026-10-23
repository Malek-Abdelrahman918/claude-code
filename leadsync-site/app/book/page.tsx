import type { Metadata } from "next";
import Booking from "../components/Booking";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Tell LeadSync about your business, then choose a time for a discovery call to discuss your operations and where AI could help.",
};

export default function BookPage() {
  return <Booking />;
}
