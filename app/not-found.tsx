import NextLink from "next/link";
import { fontVariables } from "@/lib/fonts";
import { themeScript } from "@/lib/theme";

// Requests outside any locale (the proxy normally prefixes one) land here.
export default function RootNotFound() {
  return (
    <html lang="es" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <main className="frame flex min-h-[100dvh] flex-col justify-center gap-6 py-24">
          <p className="font-data text-[13px] text-muted" aria-hidden="true">
            404
          </p>
          <h1 className="text-[clamp(44px,6vw,88px)] leading-[0.98] font-[650] tracking-[-0.05em]">Esta página no existe</h1>
          <p className="max-w-[46ch] text-[19px] leading-[1.5] text-muted">
            Puede que el enlace sea antiguo. Los proyectos están en la portada.
          </p>
          <NextLink className="button button-primary w-fit" href="/">
            Volver al inicio
          </NextLink>
        </main>
      </body>
    </html>
  );
}
