import NextLink from "next/link";
import { fontVariables } from "@/lib/fonts";

// Requests outside any locale (the proxy normally prefixes one) land here.
export default function RootNotFound() {
  return (
    <html lang="es" className={fontVariables}>
      <body>
        <main className="void field-walnut">
          <div className="frame void-inner">
            <h1 className="display">Ticket anulado</h1>
            <p className="lead">Esta dirección no corresponde a ninguna venta.</p>
            <NextLink className="button" href="/">
              Volver al inicio
            </NextLink>
          </div>
        </main>
      </body>
    </html>
  );
}
