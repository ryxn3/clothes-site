import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Contact | Hidden Pocket" };

export default function ContactPage() {
  return (
    <LegalPage title="Contact Us">
      <p>
        Have a question about sizing, an order, or a wholesale inquiry?
        We&apos;d love to hear from you.
      </p>
      <p>
        Email:{" "}
        <a href="mailto:support@hiddenpocket.com" className="text-accent">
          support@hiddenpocket.com
        </a>
      </p>
      <p>Response time: within 1 business day.</p>
    </LegalPage>
  );
}
