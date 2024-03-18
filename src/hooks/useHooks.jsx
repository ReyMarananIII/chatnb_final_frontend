import { createContext, useContext, useState } from "react";

const HooksContext = createContext();

export const HooksProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  return (
    <HooksContext.Provider
      value={{
        message,
        setMessage,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
};

export const useHooks = () => {
  const context = useContext(HooksContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
