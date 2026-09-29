import { ThemeProvider } from "@/context/ThemeProvider";
import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

export const metadata = {
  titel: "SIGACE — Iniciando",
  description:
    "Plataforma para inscripción, notas y reportes académicos en instituciones educativas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          <main className="flex min-h-dvh flex-col bg-zinc-100 dark:bg-zinc-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
