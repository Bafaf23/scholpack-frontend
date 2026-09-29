import NavbarSidebar from "@/components/organism/NabarSidebar";
import NavMovil from "@/components/organism/NavMovil";
import { AuthProvider } from "@/context/AuthContext";
import "@/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

export const metadata = {
  titel: {
    template: "SchoPack | %s",
    default: "SchoPack",
  },
  description: "Sistema de control de Estudios para Liceos",
};

export default function DashboardLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex flex-1 gap-2 bg-zinc-100 dark:bg-zinc-950">
        <NavbarSidebar />
        <div className="flex h-screen w-full min-w-0 flex-col">
          <main className="flex h-full w-full flex-col overflow-y-auto scroll-smooth p-4">
            {children}
          </main>
          <NavMovil />
        </div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className:
              "rounded-xl border border-slate-100 shadow-lg font-medium",
            duration: 4000,
          }}
        />
      </div>
    </AuthProvider>
  );
}
