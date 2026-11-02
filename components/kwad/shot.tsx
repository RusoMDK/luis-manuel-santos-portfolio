import type { CSSProperties } from "react";
import { getImageProps } from "next/image";

type Source = {
  src: string;
  width: number;
  height: number;
  /** CSS width of the captured element in the app (the files are taken at 2x). */
  native: number;
  /** Smallest font size inside the element, in CSS px, measured at capture time. */
  minFont: number;
  /** Widest CSS width the page shows it at: 1440 for desktop, 390 for a phone. */
  display: number;
  /** On phones, runs edge to edge instead of sitting inside the margins. */
  bleed?: boolean;
};

// Element screenshots of KWAD (tenant MiNegocio, sample data), taken with
// locator boxes at deviceScaleFactor 2. Each is shown at no more than half its
// source width, so it stays sharp on 2x screens, and its smallest text never
// drops below 11 CSS px (minFont × display / native). tests/content.test.mjs
// checks both rules against the files.
export const kwadShots = {
  terminal: {
    desktop: { src: "/images/kwad/crop/terminal.jpg", width: 800, height: 836, native: 400, minFont: 12.16, display: 400 },
    mobile: { src: "/images/kwad/crop/terminal.jpg", width: 800, height: 836, native: 400, minFont: 12.16, display: 390, bleed: true },
  },
  ledger: {
    desktop: { src: "/images/kwad/crop/movimientos.jpg", width: 850, height: 636, native: 425, minFont: 12, display: 425 },
    mobile: { src: "/images/kwad/crop/mobile/movimientos.jpg", width: 724, height: 522, native: 362, minFont: 12, display: 358 },
  },
  currency: {
    desktop: { src: "/images/kwad/crop/multimoneda.jpg", width: 1354, height: 428, native: 677, minFont: 11, display: 677 },
    mobile: { src: "/images/kwad/crop/mobile/multimoneda.jpg", width: 660, height: 428, native: 330, minFont: 12, display: 330 },
  },
  reception: {
    desktop: { src: "/images/kwad/crop/recepcion.jpg", width: 1252, height: 818, native: 626, minFont: 12, display: 626 },
    mobile: { src: "/images/kwad/crop/mobile/recepcion.jpg", width: 732, height: 640, native: 366, minFont: 14, display: 358 },
  },
} as const satisfies Record<string, { desktop: Source; mobile: Source }>;

export type KwadShotId = keyof typeof kwadShots;

export const PHONE_MEDIA = "(max-width: 900px)";

type ShotProps = {
  id: KwadShotId;
  alt: string;
  priority?: boolean;
};

/** One screenshot with its own phone source (art direction through <picture>). */
export function Shot({ id, alt, priority }: ShotProps) {
  const { desktop, mobile } = kwadShots[id];
  const pick = ({ src, width, height }: Source) => ({ src, width, height });
  // Below the fold a capture waits behind the page's largest paint: lazy and low priority.
  const { props: image } = getImageProps({
    ...pick(desktop),
    alt,
    sizes: `${desktop.display}px`,
    ...(priority ? { priority } : { fetchPriority: "low" as const }),
  });
  const { props: phone } = getImageProps({ ...pick(mobile), alt, sizes: `${mobile.display}px` });
  const style = { "--shot-w": `${desktop.display}px`, "--shot-w-phone": `${mobile.display}px` } as CSSProperties;

  return (
    <picture className="shot" style={style} data-bleed={"bleed" in mobile ? "" : undefined}>
      <source media={PHONE_MEDIA} srcSet={phone.srcSet} sizes={phone.sizes} width={mobile.width} height={mobile.height} />
      {/* The props come from getImageProps, so this is the optimised image. */}
      <img {...image} alt={alt} />
    </picture>
  );
}
