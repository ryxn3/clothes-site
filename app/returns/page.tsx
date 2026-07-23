import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Returns | Hidden Pocket" };

export default function ReturnsPage() {
  return (
    <LegalPage title="Returns">
      <p>
        We offer free returns within 30 days of delivery on unworn items with
        original tags attached. To start a return, contact us with your order
        number and we will email you a prepaid shipping label.
      </p>
      <p>
        Refunds are issued to your original payment method within 5-7
        business days of us receiving your return.
      </p>
    </LegalPage>
  );
}
