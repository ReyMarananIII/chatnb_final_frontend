import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const HooksContext = createContext();

export const HooksProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [visitor, setVisitor] = useState({});
  const [visitorID, setVisitorID] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // To get the visitor ID
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3000/getUser")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "visitor") {
            setVisitorID(result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/visitor/detail/" + visitorID)
      .then((result) => {
        setVisitor({
          ...visitor,
          username: result.data.Result[0].username,
          password: result.data.Result[0].password,
          rewardPoints: result.data.Result[0].rewardPoints,
        });
      })
      .catch((err) => console.log(err));
  }, [visitorID]);

  return (
    <HooksContext.Provider
      value={{
        message,
        setMessage,
        visitor,
        setVisitor,
        visitorID,
        setVisitorID,
        currentQuestionIndex,
        setCurrentQuestionIndex,
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
