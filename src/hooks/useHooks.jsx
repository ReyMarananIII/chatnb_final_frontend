import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const HooksContext = createContext();

export const HooksProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [visitor, setVisitor] = useState({
    username: "",
    password: "",
    rewardPoints: "",
  });
  const [visitorID, setVisitorID] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //To retreive the visitor info
  useEffect(() => {
    getVisitor();
  }, []);

  const getVisitor = () => {
    //Get visitor ID
    // To get the visitor ID and visitor
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3000/getUser")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "visitor") {
            const id = result.data.id;
            // Get visitor information
            axios
              .get("http://localhost:3000/visitor/detail/" + id)
              .then((result) => {
                setVisitor({
                  ...visitor,
                  username: result.data.Result[0].username,
                  password: result.data.Result[0].password,
                  rewardPoints: result.data.Result[0].rewardPoints,
                });
                setVisitorID(id);
              })
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => console.log(err));
  };

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
        getVisitor,
      }}
    >
      {children}
    </HooksContext.Provider>
  );
};

export const UseHooks = () => {
  const context = useContext(HooksContext);
  if (!context) {
    throw new Error("UseHooks must be used within a HooksProvider");
  }
  return context;
};
