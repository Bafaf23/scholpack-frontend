import Button from "./Button";
import { useTheme } from "@/context/ThemeProvider";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

/**
 * Toggle que cambia el tema al gusto del usuario. (Claro, Oscuro)
 *
 * @returns {JSX.Element}
 */

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex flex-col">
      <label className="dark:text-zinc-500 font-bold text-gray-400">Tema</label>
      <Button
        icon={theme == "light" ? faMoon : faSun}
        onClick={toggleTheme}
        classNameBtn={"text-slate-300 p-1 text-xl"}
      />
    </div>
  );
}
