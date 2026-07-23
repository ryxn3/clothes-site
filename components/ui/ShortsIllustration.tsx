interface ShortsIllustrationProps {
  hex: string;
  shadeHex: string;
  className?: string;
}

/** Stylized, brand-consistent product illustration used in place of stock photography. */
export function ShortsIllustration({
  hex,
  shadeHex,
  className,
}: ShortsIllustrationProps) {
  const gradId = `grad-${hex.replace("#", "")}`;
  return (
    <svg
      viewBox="0 0 240 260"
      className={className}
      role="img"
      aria-label="Illustration of the Hidden Pocket Corduroy Shorts"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hex} />
          <stop offset="100%" stopColor={shadeHex} />
        </linearGradient>
      </defs>
      <path
        d="M40 20 h160 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 h-3 l6 150 a8 8 0 0 1 -8 9 h-40 a8 8 0 0 1 -8 -7 l-13 -110 h-8 l-13 110 a8 8 0 0 1 -8 7 h-40 a8 8 0 0 1 -8 -9 l6 -150 h-3 a10 10 0 0 1 -10 -10 v-40 a10 10 0 0 1 10 -10 z"
        fill={`url(#${gradId})`}
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="1.5"
      />
      {/* waistband stitch line */}
      <line x1="34" y1="44" x2="206" y2="44" stroke="rgba(0,0,0,0.2)" strokeDasharray="3 4" />
      {/* fly seam */}
      <line x1="120" y1="70" x2="120" y2="150" stroke="rgba(0,0,0,0.15)" />
      {/* hidden pocket indicator (subtle stitched outline, not a visible pocket) */}
      <rect
        x="150"
        y="52"
        width="34"
        height="26"
        rx="4"
        fill="none"
        stroke="rgba(0,0,0,0.25)"
        strokeDasharray="2 3"
      />
    </svg>
  );
}
