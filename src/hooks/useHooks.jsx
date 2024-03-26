import { createContext, useContext, useState } from "react";

const HooksContext = createContext();

export const HooksProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [visitor, setVisitor] = useState({
    visitorID: "",
    username: "",
    password: "",
    rewardPoints: "",
  });

  return (
    <HooksContext.Provider
      value={{
        message,
        setMessage,
        visitor,
        setVisitor,
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
