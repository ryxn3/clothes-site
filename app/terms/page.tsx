import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Service | Hidden Pocket" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        By purchasing from Hidden Pocket, you agree to provide accurate
        billing and shipping information and to use our products in
        accordance with their intended purpose.
      </p>
      <p>
        All content on this site, including product designs, photography, and
        branding, is the property of Hidden Pocket and may not be reproduced
        without permission.
      </p>
    </LegalPage>
  );
}
