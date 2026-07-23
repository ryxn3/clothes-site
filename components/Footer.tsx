"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
} from "react-icons/fa";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="bg-ink-950 py-16 text-ink-300">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <Reveal blur={false} y={20}>
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-2xl text-ink-50">
                Join the Hidden Pocket list.
              </h2>
              <p className="mt-2 max-w-sm text-sm text-ink-400">
                Early access to new colors, private drops, and travel tips.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md items-center gap-3"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-ink-50 placeholder:text-ink-500 focus:border-accent focus:outline-none"
              />
              <MagneticButton
                type="submit"
                className="whitespace-nowrap bg-ink-50 px-6 text-ink-950 hover:bg-white"
              >
                {submitted ? "Subscribed" : "Subscribe"}
              </MagneticButton>
            </form>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg text-ink-50">HIDDEN POCKET</p>
            <p className="mt-2 text-xs text-ink-500">
              &copy; {new Date().getFullYear()} Hidden Pocket. All rights reserved.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {[
              { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
              { icon: FaTiktok, label: "TikTok", href: "https://tiktok.com" },
              { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-accent hover:text-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
