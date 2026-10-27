import { LCD_COLUMNS, lcdDot } from "@/lib/lcd-font";

// Geometry of one dot and one character cell, in SVG units: 5×8 dots per cell,
// one dot of air between cells and between the two rows, as on the real module.
const DOT = 4;
const PITCH = 4.7;
const CELL_X = 6;
const CELL_Y = 9;

function dots(lines: readonly string[], lit: boolean) {
  let path = "";
  lines.forEach((text, row) => {
    const cells = text.padEnd(LCD_COLUMNS).slice(0, LCD_COLUMNS);
    [...cells].forEach((char, column) => {
      for (let y = 0; y < 8; y += 1) {
        for (let x = 0; x < 5; x += 1) {
          if (lcdDot(char, x, y) !== lit) continue;
          const left = (column * CELL_X + x) * PITCH;
          const top = (row * CELL_Y + y) * PITCH;
          path += `M${left.toFixed(1)} ${top.toFixed(1)}h${DOT}v${DOT}h-${DOT}z`;
        }
      }
    });
  });
  return path;
}

/**
 * Two lines of a 16x2 character LCD drawn dot by dot (no monospaced font). It is
 * decorative: the caller gives the readings to assistive technology in words.
 */
export function LcdScreen({ lines }: { lines: readonly [string, string] }) {
  const width = (LCD_COLUMNS * CELL_X - 1) * PITCH;
  const height = (2 * CELL_Y - 1) * PITCH;
  return (
    <svg className="lcd-dots" viewBox={`0 0 ${width.toFixed(1)} ${height.toFixed(1)}`} aria-hidden="true" focusable="false">
      <path className="lcd-off" d={dots(lines, false)} />
      <path className="lcd-on" d={dots(lines, true)} />
    </svg>
  );
}
