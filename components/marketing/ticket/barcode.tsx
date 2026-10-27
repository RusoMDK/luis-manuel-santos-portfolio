import { encodeCode128B } from "@/lib/code128";

type BarcodeProps = {
  value: string;
  className?: string;
};

export function Barcode({ value, className }: BarcodeProps) {
  const { bars, modules } = encodeCode128B(value);
  // Ten modules of quiet zone on each side, as the symbology requires.
  const quiet = 10;

  return (
    <svg
      className={className}
      viewBox={`${-quiet} 0 ${modules + quiet * 2} 40`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x} y={0} width={bar.width} height={40} fill="currentColor" />
      ))}
    </svg>
  );
}
