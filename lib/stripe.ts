import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/** Lazily instantiate the Stripe client so build/dev works without env vars set. */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "Missing STRIPE_SECRET_KEY environment variable. Add it to your .env file - see .env.example."
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }
  return stripeClient;
}
