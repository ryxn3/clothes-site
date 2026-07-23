import { ImageResponse } from "next/og";
import { PRODUCT } from "@/lib/products";

export const alt = PRODUCT.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #121110 0%, #2a2117 100%)",
          color: "#f7f7f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d4b483",
            marginBottom: 24,
          }}
        >
          Hidden Pocket
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, maxWidth: 900, lineHeight: 1.1 }}>
          {PRODUCT.name}
        </div>
        <div style={{ fontSize: 28, marginTop: 28, color: "#c2bbac", maxWidth: 800 }}>
          {PRODUCT.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
