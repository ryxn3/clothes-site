import Image from "next/image";
import { GarmentIllustration } from "@/components/ui/GarmentIllustration";
import { COLORS, FLAGSHIP_SLUG, PRODUCT_IMAGES } from "@/lib/products";
import { ColorId } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductThumbnailProps {
  slug: string;
  color: ColorId;
  alt: string;
  className?: string;
  imageClassName?: string;
}

/** Renders a real product photo for the flagship shorts, or a brand illustration for everything else. */
export function ProductThumbnail({
  slug,
  color,
  alt,
  className,
  imageClassName,
}: ProductThumbnailProps) {
  const swatch = COLORS.find((c) => c.id === color)!;

  if (slug === FLAGSHIP_SLUG) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={PRODUCT_IMAGES[color]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={cn("object-cover object-top", imageClassName)}
        />
      </div>
    );
  }

  const garment = GARMENT_BY_SLUG[slug] ?? "tee";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <GarmentIllustration
        garment={garment}
        hex={swatch.hex}
        shadeHex={swatch.shadeHex}
        className={cn("h-full w-full", imageClassName)}
      />
    </div>
  );
}

const GARMENT_BY_SLUG: Record<string, "sweatpants" | "hoodie" | "zip-hoodie" | "tee"> = {
  "hidden-pocket-sweatpants": "sweatpants",
  "hidden-pocket-hoodie": "hoodie",
  "hidden-pocket-zip-hoodie": "zip-hoodie",
  "hidden-pocket-tee": "tee",
};
