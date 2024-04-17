import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const HooksContext = createContext();

export const HooksProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [visitor, setVisitor] = useState({
    username: "",
    password: "",
    rewardPoints: "",
  });
  const [visitorID, setVisitorID] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [nb, setNB] = useState({
    name: "",
    information: "",
    voiceID: "",
    image: "",
    model: "",
    bgImage: "",
    reference: "",
  });

  // To track messages
  // The content needs nb information for creating AI
  const [allMessages, setAllMessages] = useState([
    {
      role: "system",
      content: "", // nb information needed for question and answering data
    },
  ]);

  // For chatnb information
  const addNBInfo = (role, information, name) => {
    // To tell the pretrained model how  to response
    const nbInformation = `Ito ang mga pamantayan mo sa pagsasagot:
  
    Magpanggap kang ikaw si ${name}. Ang user ay tatanungin ka bilang si ${name}. Dapat ang iyong sagot ay parang ikaw si ${name}. 
    Kapag ang tanong sayo ay wala sa mga detalye na babangitin mamaya, dapat ang sagot mo ay "Paumanhin, wala akong masasabi."
    Huwag na huwag kang magbibigay ng inpormasyon o sasagot ng wala sa mga detalye na babangitin mamaya.
    Ang sagot mo sa mga tanong sayo ay dapat sobrang maikli lamang, direkta sa punto at hindi hihigit sa isang pangungusap.
    Ang mga pamantayang ito ay dapat masunod.
    
    Mga Detalye:\n
    ${information}
    `;

    setAllMessages((prevItems) =>
      prevItems.map((item) =>
        item.role === role
          ? {
              ...item,
              content: nbInformation,
            }
          : item
      )
    );
  };

  //To retreive the visitor info
  useEffect(() => {
    getVisitor();
  }, []);

  const getVisitor = () => {
    //Get visitor ID
    // To get the visitor ID and visitor
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3000/getUser").then((result) => {
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
              setShowError(false);
            })
            .catch((err) => {
              console.log(err);
              setShowError(true);
            });
        }
      } else {
        setShowError(true);
      }
    });
  };

  const getNB = (nbID) => {
    axios
      .get("http://localhost:3000/visitor/nb/" + nbID)
      .then((result) => {
        setNB({
          ...nb,
          name: result.data.Result[0].name,
          information: result.data.Result[0].information,
          voiceID: result.data.Result[0].voiceID,
          image: result.data.Result[0].image,
          model: result.data.Result[0].model,
          bgImage: result.data.Result[0].bgImage,
          reference: result.data.Result[0].reference,
        });
        addNBInfo(
          "system",
          result.data.Result[0].information,
          result.data.Result[0].name
        ); // For chat database
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
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
        showError,
        setShowError,
        getVisitor,
        showSubtitle,
        setShowSubtitle,
        nb,
        setNB,
        getNB,
        allMessages,
        setAllMessages,
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
