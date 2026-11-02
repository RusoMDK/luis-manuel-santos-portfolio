"use client";

import { useEffect, useRef } from "react";
import { currentTheme, subscribeTheme } from "@/lib/theme";
import { GLYPHS } from "@/lib/glyphs";

const CELL = { w: 12, h: 22 };
const ATLAS = { w: 44, h: 80 };
const MAX_DPR = 2;
// Where the glow rests on a laptop until the pointer moves: over the search.
const REST: [number, number] = [0.7, 0.48];

const VERTEX = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

// One full-screen triangle. Each 12×22 cell picks a glyph from the atlas: far from
// the pointer it is faint and changes slowly; near it, it changes fast and lights up
// in the accent (u_glow scales how much). A scan band runs down the field about every 20 s.
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_dark;
uniform float u_dpr;
uniform sampler2D u_atlas;
uniform float u_count;
uniform float u_glow;
out vec4 o;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 px = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 cellSize = vec2(${CELL.w.toFixed(1)}, ${CELL.h.toFixed(1)}) * u_dpr;
  vec2 cell = floor(px / cellSize);
  vec2 local = fract(px / cellSize);
  vec2 centre = (cell + 0.5) * cellSize;
  float d = length(centre - u_mouse) / u_res.y;
  float near = exp(-d * d * 20.0) * u_glow;
  float seed = hash(cell);
  float rate = mix(0.12, 7.0, near) * (0.5 + seed);
  float tick = floor(u_time * rate + seed * 10.0);
  float g = floor(hash(cell + tick * 0.137) * u_count);
  float rows = u_res.y / cellSize.y;
  float scan = exp(-pow((fract(u_time * 0.05) * (rows + 30.0) - 15.0 - cell.y) / 6.0, 2.0));
  float show = step(0.70 - 0.70 * max(near, scan * 0.5), hash(cell * 1.31 + 7.0));
  float a = texture(u_atlas, vec2((g + local.x) / u_count, local.y)).r;
  vec3 bg = mix(vec3(0.969, 0.969, 0.961), vec3(0.039, 0.039, 0.043), u_dark);
  vec3 ink = mix(vec3(0.067, 0.067, 0.075), vec3(0.929, 0.929, 0.937), u_dark);
  vec3 accent = mix(vec3(0.184, 0.294, 0.878), vec3(0.42, 0.53, 1.0), u_dark);
  float fade = smoothstep(0.0, 0.18, 1.0 - px.y / u_res.y);
  float alpha = clamp(0.11 + scan * 0.14 + near * 0.75, 0.0, 1.0) * fade;
  vec3 colour = mix(ink, accent, smoothstep(0.12, 0.6, near));
  o = vec4(mix(bg, colour, a * alpha * show), 1.0);
}`;

/** The atlas: every glyph drawn once in the monospaced face, white on black, side by side. */
function drawAtlas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS.w * GLYPHS.length;
  canvas.height = ATLAS.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const family = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.font = `400 56px ${family}, ui-monospace, monospace`; // taste-skill-ignore: the brief draws the atlas in Geist Mono
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  [...GLYPHS].forEach((glyph, index) => ctx.fillText(glyph, index * ATLAS.w + ATLAS.w / 2, ATLAS.h / 2 + 2));
  return canvas;
}

function compile(gl: WebGL2RenderingContext): WebGLProgram | null {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

/**
 * The hero's background: a grid of code glyphs in WebGL2 that wakes up around the
 * pointer. It is decoration (aria-hidden), loads after the page (see GlyphBackdrop),
 * pauses off screen and in a hidden tab, and caps the pixel ratio at 2. Without
 * WebGL2 it draws nothing; with reduced motion it draws one still frame. On a touch
 * screen, with no pointer to follow, the lit area drifts slowly across the field.
 */
export default function GlyphField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;
    const program = compile(gl);
    if (!program) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const names = ["u_res", "u_time", "u_mouse", "u_dark", "u_dpr", "u_atlas", "u_count", "u_glow"] as const;
    const u = Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)])) as Record<
      (typeof names)[number],
      WebGLUniformLocation | null
    >;

    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(u.u_atlas, 0);
    gl.uniform1f(u.u_count, GLYPHS.length);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    // On a phone the drifting glow passes under the text, so it stays dimmer there.
    gl.uniform1f(u.u_glow, touch ? 0.4 : 1);
    let dark = currentTheme() === "dark";
    let dpr = 1;
    let raf = 0;
    let onScreen = true;
    let pointer: [number, number] | null = null;
    const mouse: [number, number] = [REST[0], REST[1]];
    const start = performance.now();

    const draw = (now: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const t = reduce ? 4 : (now - start) / 1000;
      const target: [number, number] =
        pointer ?? (touch && !reduce ? [0.5 + 0.32 * Math.sin(t * 0.11), 0.45 + 0.28 * Math.sin(t * 0.17 + 1)] : REST);
      const ease = reduce || touch ? 1 : 0.12;
      mouse[0] += (target[0] - mouse[0]) * ease;
      mouse[1] += (target[1] - mouse[1]) * ease;
      gl.uniform2f(u.u_res, w, h);
      gl.uniform1f(u.u_time, t);
      gl.uniform2f(u.u_mouse, mouse[0] * w, mouse[1] * h);
      gl.uniform1f(u.u_dark, dark ? 1 : 0);
      gl.uniform1f(u.u_dpr, dpr);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reduce) {
        draw(performance.now());
      } else if (onScreen && !document.hidden) {
        raf = requestAnimationFrame(loop);
      }
    };

    const upload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, drawAtlas());
      if (reduce) draw(performance.now());
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const box = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(box.width * dpr));
      canvas.height = Math.max(1, Math.round(box.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduce) draw(performance.now());
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = canvas.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      pointer = x >= 0 && x <= 1 && y >= 0 && y <= 1 ? [x, y] : null;
      if (reduce) draw(performance.now());
    };

    upload();
    resize();
    document.fonts?.load(`400 56px ${getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono")}`).then(upload, () => {});

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    visibility.observe(canvas);
    const stopTheme = subscribeTheme(() => {
      dark = currentTheme() === "dark";
      if (reduce) draw(performance.now());
    });
    const onLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(raf);
    };

    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("webglcontextlost", onLost);
    sync();
    canvas.dataset.ready = "";

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      stopTheme();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="block size-full opacity-0 transition-opacity duration-700 data-[ready]:opacity-100"
    />
  );
}
