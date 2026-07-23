import type { Metadata } from "next";
import { SuccessContent } from "@/components/SuccessContent";

export const metadata: Metadata = {
  title: "Order Confirmed | Hidden Pocket Corduroy Shorts",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return <SuccessContent />;
}
