import { GarmentType } from "@/lib/types";

interface GarmentIllustrationProps {
  garment: GarmentType;
  hex: string;
  shadeHex: string;
  className?: string;
}

/** Stylized, brand-consistent garment illustrations for products we don't have photography for yet. */
export function GarmentIllustration({
  garment,
  hex,
  shadeHex,
  className,
}: GarmentIllustrationProps) {
  const gradId = `garment-grad-${garment}-${hex.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 240 260"
      className={className}
      role="img"
      aria-label={`Illustration of the ${garment.replace("-", " ")}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hex} />
          <stop offset="100%" stopColor={shadeHex} />
        </linearGradient>
      </defs>
      {garment === "sweatpants" && <Sweatpants fill={`url(#${gradId})`} />}
      {garment === "hoodie" && <Hoodie fill={`url(#${gradId})`} />}
      {garment === "zip-hoodie" && <ZipHoodie fill={`url(#${gradId})`} />}
      {garment === "tee" && <Tee fill={`url(#${gradId})`} />}
    </svg>
  );
}

function Sweatpants({ fill }: { fill: string }) {
  return (
    <g stroke="rgba(0,0,0,0.15)" strokeWidth="1.5">
      <rect x="40" y="18" width="160" height="26" rx="13" fill={fill} />
      <rect x="44" y="42" width="152" height="52" rx="18" fill={fill} />
      <rect x="48" y="92" width="60" height="140" rx="20" fill={fill} />
      <rect x="132" y="92" width="60" height="140" rx="20" fill={fill} />
      <rect x="48" y="222" width="60" height="18" rx="9" fill="rgba(0,0,0,0.18)" stroke="none" />
      <rect x="132" y="222" width="60" height="18" rx="9" fill="rgba(0,0,0,0.18)" stroke="none" />
      <line x1="120" y1="70" x2="120" y2="150" stroke="rgba(0,0,0,0.12)" />
      <line x1="110" y1="34" x2="110" y2="70" stroke="rgba(0,0,0,0.25)" />
      <line x1="130" y1="34" x2="130" y2="70" stroke="rgba(0,0,0,0.25)" />
    </g>
  );
}

function Hoodie({ fill }: { fill: string }) {
  return (
    <g stroke="rgba(0,0,0,0.15)" strokeWidth="1.5">
      <path
        d="M78 30 Q120 4 162 30 L172 56 Q120 40 68 56 Z"
        fill={fill}
      />
      <rect x="26" y="60" width="52" height="104" rx="22" transform="rotate(-8 52 112)" fill={fill} />
      <rect x="162" y="60" width="52" height="104" rx="22" transform="rotate(8 188 112)" fill={fill} />
      <rect x="58" y="54" width="124" height="150" rx="22" fill={fill} />
      <rect x="88" y="150" width="64" height="44" rx="10" fill="rgba(0,0,0,0.12)" stroke="none" />
      <rect
        x="88"
        y="150"
        width="64"
        height="44"
        rx="10"
        fill="none"
        stroke="rgba(0,0,0,0.28)"
        strokeDasharray="2 3"
      />
      <rect x="58" y="188" width="124" height="16" rx="7" fill="rgba(0,0,0,0.15)" stroke="none" />
    </g>
  );
}

function ZipHoodie({ fill }: { fill: string }) {
  return (
    <g stroke="rgba(0,0,0,0.15)" strokeWidth="1.5">
      <path
        d="M78 30 Q120 4 162 30 L172 56 Q120 40 68 56 Z"
        fill={fill}
      />
      <rect x="26" y="60" width="52" height="104" rx="22" transform="rotate(-8 52 112)" fill={fill} />
      <rect x="162" y="60" width="52" height="104" rx="22" transform="rotate(8 188 112)" fill={fill} />
      <path d="M58 54 H182 V204 H58 Z" fill={fill} />
      <rect x="117" y="52" width="6" height="152" fill="rgba(0,0,0,0.35)" stroke="none" />
      <circle cx="120" cy="150" r="4" fill="#c9a24b" stroke="none" />
      <rect x="58" y="188" width="124" height="16" rx="7" fill="rgba(0,0,0,0.15)" stroke="none" />
      <rect
        x="128"
        y="140"
        width="46"
        height="34"
        rx="8"
        fill="none"
        stroke="rgba(0,0,0,0.28)"
        strokeDasharray="2 3"
      />
    </g>
  );
}

function Tee({ fill }: { fill: string }) {
  return (
    <g stroke="rgba(0,0,0,0.15)" strokeWidth="1.5">
      <path
        d="M90 42 Q120 62 150 42 L188 60 L172 92 L156 80 V196 Q120 208 84 196 V80 L68 92 L52 60 Z"
        fill={fill}
      />
      <rect
        x="94"
        y="150"
        width="52"
        height="34"
        rx="8"
        fill="none"
        stroke="rgba(0,0,0,0.28)"
        strokeDasharray="2 3"
      />
    </g>
  );
}
