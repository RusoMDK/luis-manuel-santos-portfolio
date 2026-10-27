import { getImageProps } from "next/image";

type Source = { src: string; width: number; height: number };

// Real KWAD screenshots, cropped so their text reads at 11px or more:
// up to 900px of source for the desktop column, at most ~360px for a phone, where
// shots run edge to edge so they show at 1.1× or more (globals.css, .shot).
// A shot without a phone crop is left out on phones rather than shrunk.
export const kwadShots = {
  terminal: {
    desktop: { src: "/images/kwad/crop/terminal-bloqueada.jpg", width: 566, height: 520 },
    mobile: { src: "/images/kwad/crop/mobile/terminal-bloqueada.jpg", width: 410, height: 100 },
  },
  ledger: {
    desktop: { src: "/images/kwad/crop/movimientos.jpg", width: 830, height: 300 },
    mobile: { src: "/images/kwad/crop/mobile/movimientos.jpg", width: 352, height: 170 },
  },
  currency: {
    desktop: { src: "/images/kwad/crop/multimoneda.jpg", width: 860, height: 217 },
    mobile: { src: "/images/kwad/crop/mobile/multimoneda.jpg", width: 360, height: 165 },
  },
  store: {
    desktop: { src: "/images/kwad/crop/tienda-online.jpg", width: 900, height: 410 },
    mobile: null,
  },
  reception: {
    desktop: { src: "/images/kwad/crop/recepcion.jpg", width: 900, height: 365 },
    mobile: { src: "/images/kwad/crop/mobile/recepcion.jpg", width: 336, height: 160 },
  },
  audit: {
    desktop: { src: "/images/kwad/crop/auditoria.jpg", width: 900, height: 158 },
    mobile: { src: "/images/kwad/crop/mobile/auditoria.jpg", width: 352, height: 112 },
  },
} as const satisfies Record<string, { desktop: Source; mobile: Source | null }>;

export type KwadShotId = keyof typeof kwadShots;

export const PHONE_MEDIA = "(max-width: 900px)";

type ShotProps = {
  id: KwadShotId;
  alt: string;
  sizes: string;
  priority?: boolean;
};

/** One screenshot with its own phone crop (art direction through <picture>). */
export function Shot({ id, alt, sizes, priority }: ShotProps) {
  const { desktop, mobile } = kwadShots[id];
  const { props: image } = getImageProps({ ...desktop, alt, sizes, priority });
  const phone = mobile ? getImageProps({ ...mobile, alt, sizes: "100vw" }).props : null;

  return (
    <picture className="shot">
      {phone ? (
        <source media={PHONE_MEDIA} srcSet={phone.srcSet} sizes={phone.sizes} width={mobile?.width} height={mobile?.height} />
      ) : null}
      {/* The props come from getImageProps, so this is the optimised image. */}
      <img {...image} alt={alt} />
    </picture>
  );
}

export const hasPhoneCrop = (id: KwadShotId) => kwadShots[id].mobile !== null;
