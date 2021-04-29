import React, { useState, useEffect } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import db from "../firebase";
import Message from "./Message.js";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { channelId } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelData(snapshot.data()));
    }
  }, [channelId]);

  useEffect(() => {
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data().message,
            user: doc.data().user,
            timestamp: doc.data().timestamp,
            userImage: doc.data().userImage,
          }))
        )
      );
  }, [channelId]);

  // console.log(messages);
  const deleteMessage = (id) => {
    console.log("del", id);
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(id)
      .delete();
  };

  return (
    <div className="chatt">
      <div className="chat__header">
        <div className="chat__headerLeft">
          {" "}
          # {channelData?.name} <StarBorderRoundedIcon />
        </div>
        <div className="chat__headerRight">
          <ErrorOutlineIcon />
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__messages">
          {messages.map((message) => (
            <>
              <Message
                id={message.id}
                key={message.timestamp}
                message={message.message}
                timestamp={message.timestamp}
                user={message.user}
                userImage={message.userImage}
                deleteMessage={() => deleteMessage(message.id)}
              />
            </>
          ))}
        </div>
      </div>
      <div className="chat__input">
        <ChatInput channelName={channelData?.name} channelId={channelId} />
      </div>
    </div>
  );
};

export default Chat;
