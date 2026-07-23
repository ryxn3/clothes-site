import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { COLORS, PRODUCT } from "@/lib/products";
import { CartLine } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { lines } = (await req.json()) as { lines: CartLine[] };

    if (!Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const stripe = getStripe();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const line_items = lines.map((line) => {
      const color = COLORS.find((c) => c.id === line.color);
      return {
        quantity: line.quantity,
        price_data: {
          currency: PRODUCT.currency,
          unit_amount: Math.round(PRODUCT.price * 100),
          product_data: {
            name: PRODUCT.name,
            description: `${color?.name ?? line.color} · Size ${line.size}`,
          },
        },
      };
    });

    // payment_method_types is intentionally omitted: Stripe Checkout
    // auto-enables card, Apple Pay, Google Pay, Link, etc. based on the
    // methods activated in the Dashboard.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancelled`,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR"] },
      automatic_tax: { enabled: false },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unable to create checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
