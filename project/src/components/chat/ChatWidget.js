import React, { useRef, useState, useEffect, useCallback } from "react";
import "./chat.css";
import { ChatIcon } from "@chakra-ui/icons";
import { ChakraProvider } from "@chakra-ui/react";
import Chat from "./chat";
const ChatWidget = (props) => {
  const [showDiv, setShowDiv] = useState(false);
  const handleClickShow = () => {
    setShowDiv(!showDiv);
  };

  return (
    <ChakraProvider>
      <div style={{ zIndex: "1111" }}>
        <Chat isVisible={showDiv} userID={props.userID} role={props.role} />
        <div className="button-container">
          <button className="message-button" onClick={handleClickShow}>
            <ChatIcon />
          </button>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default ChatWidget;
