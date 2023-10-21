import React, { useRef, useState, useEffect, useCallback } from "react";
import { useToast,Badge } from '@chakra-ui/react';
import io from "socket.io-client";
import axios from "axios";
const socket = io("http://localhost:3005");

const Chat = (props) => {
  // variables declaration
  const [users, setUsers] = useState(null);
  const [usersF, setUsersF] = useState(null);
  const { isVisible } = props;
  const [userById, setUserById] = useState({});
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(null);
  const [messagesR, setMessagesR] = useState(null);
  const [date, setDate] = useState();
  const toast = useToast()
  const [activeUserId, setActiveUserId] = useState({});
  // get users methode
  const getUsers = async () => {
    const result = await axios.get("http://localhost:9000/user/users");
    return result.data;
  };
  const getCompanies = async () => {
    const result = await axios.get("http://localhost:9000/user/companies");
    return result.data;
  }
  // set the active chat tab with the selected user and filter the messages array based on the selected user
  const handleClickUser = (user) => {
    setActiveUserId(user);
    const userResetNotification = users.find((userR) => userR._id === user._id);
    if (userResetNotification) {
      userResetNotification.hasNewMessage =0;
    }
    const filteredMessages = messagesR.filter(
      (msg) =>
        msg.reciver === user._id ||
        msg.sender === user._id ||
        msg.sender._id === user._id
    );
    setMessages(filteredMessages);  
  };
  // fetch data and messages from the database methode called upon loading the component
  const fetchData = async () => {
    let user = await getUsers();
    let comapnies = await getCompanies();
    setMessages(await getMessages(props.userID));
    setMessagesR(await getMessages(props.userID));
    user.forEach(user => {
      user.hasNewMessage = 0;
    });
    comapnies.forEach(user => {
      user.hasNewMessage = 0;
    });

    if (props.role ==="company"){
      setUserById(comapnies.find((comp) => comp._id === props.userID));   
      const filteredUsers = comapnies.filter((comapnies) => comapnies._id !== props.userID);
      const mergedUsers = [...user, ...filteredUsers];
      setUsers(mergedUsers);
      setUsersF(mergedUsers);
    }
    else {
      setUserById(user.find((user) => user._id === props.userID));
      const filteredUsers = user.filter((user) => user._id !== props.userID);
      const mergedUsers = [...comapnies, ...filteredUsers];
      setUsers(mergedUsers);
      setUsersF(mergedUsers);
    }
  
  };
 // get messages async function that's called in the fetch data function
  const getMessages = async (id) => {
    const result = await axios.get(
      `http://localhost:9000/api/Messages/get/${id}`
    );
    return result.data;
  };
  // handle the new message event triggered by the socket
  const handleMessage = useCallback(
    (data) => {
      if (data.sender === userById._id) {
        return false;
      }
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessagesR((prevMessages) => [...prevMessages, data]);
      if (data.sender != activeUserId._id && data.reciver === userById._id) {
        toast({
          position: "top-right",
          variant: "solid",
          title: "Message received.",
          description: "You have received a new message from " + data.username,
          duration: 5000,
          isClosable: true,
        });
        const user = users.find((user) => user._id === data.sender);
        if (user) {
          user.hasNewMessage++;
        }
      }
    },
    [setMessages, userById._id, activeUserId._id, users]
  );
  
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect to handle the socket event
  useEffect(() => {
    socket.on("new-message", handleMessage);
    return () => {
      socket.off("new-message", handleMessage);
    };
  }, [handleMessage, socket]);
  // useEffect to scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);
  // handle the keydown event (Pressing Enter) to send the message
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      insertMessage();
      setInputValue("");
    }
  }
  // handle the change event of the messages input
  function handleChange(event) {
    setInputValue(event.target.value);
  }
  // insert the message in the messages array and send it to the server using the socket
  function insertMessage() {
    if (inputValue.trim() === "") {
      return false;
    }

    let newMessage = {

    };
    if (props.role ==="company") {
       newMessage = {
        sender: userById._id,
        reciver: activeUserId._id,
        username: userById.fullName,
        message: inputValue,
        senderModel: "company"
      };
    }
    else {
       newMessage = {
        sender: userById._id,
        reciver: activeUserId._id,
        username: userById.fullName,
        message: inputValue,
        senderModel: "user"
      };
    }
    console.log("new message ",newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessagesR((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    socket.emit("new-message", newMessage);
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    setDate(hours + ":" + minutes);
  }
  // handle the click event of the send button
  function handleClick() {
    insertMessage();
  }
  // handle the search input change event
  const handleSearch = (event) => {
    const searchQuery = event.target.value.trim().toLowerCase(); // get the search input and convert to lowercase
    const filteredUsers = searchQuery
      ? usersF.filter((user) => user.fullName.toLowerCase().includes(searchQuery)) // filter users array based on search input
      : [...usersF]; // reset the users array if search input is empty
    setUsers(filteredUsers); // update the users state with filtered array
  };

  return (
    <div className={isVisible ? "" : "invisible"}>
      <div className="chat">
        <div className="chat-title">
          <h1 id="user">{userById.fullName}</h1>
          <h2>user</h2>
          <figure className="avatar">
            <img
              alt="texting "
              src="https://st2.depositphotos.com/3867453/6986/v/600/depositphotos_69864645-stock-illustration-letter-m-logo-icon-design.jpg"
            />
          </figure>
        </div>
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
          <div className="users">
            <div
              style={{
                width: "22%",
                position: "fixed",
                overflowY: "scroll",
                zIndex: 80,
                height: "90%",
              }}
            >
              <form className="search-form">
                <input
                  type="text"
                  className="search-box"
                  placeholder="Search for user..."
                  onChange={handleSearch}
                />
              </form>
              <br></br>
              {users &&
                users.map((user) => (
                  <div
                    key={user._id}
                    className={`user-box ${
                      activeUserId._id === user._id ? "active" : ""
                    }`}
                    onClick={() => handleClickUser(user)}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        {" "}
                        <img
                          className="user-av"
                          alt="img"
                          src={`${user.picture}`}
                        />{" "}
                        {user.hasNewMessage > 0 && (
                          <Badge
                            colorScheme="teal"
                            position="absolute"
                            borderRadius="100%"
                            fontSize="0.8em"
                            height="2vh"
                            top="-3px"
                            right="-5px"
                          >
                            {user.hasNewMessage}
                          </Badge>
                        )}
                      </div>
                      <div style={{ color: "grey" }}>{user.fullName}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="messages">
            <div
              className="messages-content"
              style={{ overflowY: "scroll", marginLeft: -3 }}
            >
              {activeUserId._id ? (
                messages &&
                messages.map((msg, index) =>
                  msg.sender._id === userById._id ||
                  msg.sender === userById._id ? (
                    <div key={index} className="message message-personal new">
                      <div className="message-text">{msg.message}</div>
                      <div className="timestamp">{date}</div>
                    </div>
                  ) : msg.reciver === userById._id &&
                    (msg.sender._id === activeUserId._id ||
                      msg.sender === activeUserId._id) ? (
                    <div key={index} className="message message new">
                      <img
                        className="avatar"
                        alt="img"
                        src={`${activeUserId.picture}`}
                      />
                      <div className="user">{msg.username}</div>
                      <div className="message-text">{msg.message}</div>
                      <div className="timestamp2">{date}</div>
                    </div>
                  ) : null
                )
              ) : (
                <p className="heading-msg">
                  Welcome to our course chat!
                  <br /> Please keep the conversation respectful
                  <br />
                  and engaging. choose a user <br />
                  to engage in a conversation!
                </p>
              )}
              <div
                ref={messagesEndRef}
                style={{ float: "left", clear: "both" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="message-box">
            <input
              type="text"
              className="message-input"
              placeholder="Type message..."
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="message-submit"
              onClick={handleClick}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;