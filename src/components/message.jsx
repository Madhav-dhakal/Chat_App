import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ChatContext } from "../context/chat.contex";

const Message = ({ message,onDelete,sentTime }) => {

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleRightClick = (event) => {
    // event.preventDefault();
    
     onDelete(message);
  };

  const handleImageClick = () => {
    
    const imageWindow = window.open("", "_blank", "width=600, height=400");
  if (imageWindow) {
    imageWindow.document.write(`
      <html>
        <head>
          <title>Image</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
            img { max-width: 100%; max-height: 100%; }
          </style>
        </head>
        <body>
          <img src="${message.img}" alt="Message Image" />
        </body>
      </html>
    `);
    imageWindow.document.close();
  } else {
    console.error("Failed to open image in new window.");
  }
    // Handle image click for downloading or saving
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

   
  };
  
    const formatTime = (timestamp) => {
      const currentTime = new Date();
      const hours = currentTime.getHours() % 12 || 12; 
      const minutes = currentTime.getMinutes();
      const amOrPm = currentTime.getHours() >= 12 ? "PM" : "AM";
      return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${amOrPm}`;
  };


  console.log(message);

  return (
    <>
      <div
     onContextMenu={handleRightClick}
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
  
    >


      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        
      
       <span>{formatTime(sentTime)}</span> 
        
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && (
        <img src={message.img} alt=""
        onClick={handleImageClick}
        onContextMenu={handleRightClick}
        className="clickable"
        />)}
      </div>
     
    </div>
    </>
  );
};

export default Message;
