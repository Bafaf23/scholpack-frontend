import { useContext, createContext, useState } from "react";

const RememberContext = createContext();

export const RememberProvider = ({ children }) => {
  const [rememberUser, setRememberUser] = useState(() => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem("rememberedUser");
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  const forgetUser = () => {
    localStorage.removeItem("rememberedUser");
    setRememberUser(null);
  };

  return (
    <RememberContext.Provider
      value={{
        rememberUser,
        hasRememberedUser: Boolean(rememberUser),
        forgetUser,
      }}
    >
      {children}
    </RememberContext.Provider>
  );
};

export const useRemember = () => useContext(RememberContext);
