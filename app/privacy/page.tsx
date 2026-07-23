import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy | Hidden Pocket" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        We collect only the information necessary to process your order and
        improve your shopping experience, including your name, shipping
        address, email, and payment details. Payment information is processed
        securely by Stripe and is never stored on our servers.
      </p>
      <p>
        We do not sell your personal data to third parties. You may request
        access to, correction of, or deletion of your data at any time by
        contacting us.
      </p>
    </LegalPage>
  );
}
