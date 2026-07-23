import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Shipping | Hidden Pocket" };

export default function ShippingPage() {
  return (
    <LegalPage title="Shipping">
      <p>
        Standard domestic shipping takes 3-5 business days. International
        orders typically arrive within 7-14 business days, depending on
        destination and customs processing.
      </p>
      <p>
        You will receive a tracking number by email as soon as your order
        ships. Orders are processed within 1-2 business days of purchase.
      </p>
    </LegalPage>
  );
}
