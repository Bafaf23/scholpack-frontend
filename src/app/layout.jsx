import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "@/context/ThemeProvider";

config.autoAddCss = false;

export const metadata = {
  title: "SchoPack — La escula en un solo paquete",
  description:
    "Plataforma para inscripción, notas y reportes académicos en instituciones educativas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          <main className="flex min-h-full flex-col font-sans antialiased text-slate-800 bg-zinc-100 dark:bg-zinc-900 dark:text-slate-200">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
