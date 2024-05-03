import React, { useContext } from "react";
import cam from "../img/cam.jpg"
import add from "../img/add.jpg" 
import more from "../img/more.jpg" 
import Messages from "./messages";
import Input from "./input";
import { ChatContext } from "../context/chat.contex";
const Chating=()=>{
     const {data} = useContext(ChatContext)
     return(
          <>
            <div className="chat">
               <div className="chatInfo">
                    <span>{data.user?.displayName}</span>
                    <div className="chatIcons">
                         <img src={cam}/>
                          <img src={add}/>
                         <img src={more}/> 
                    </div>
               </div>
               <Messages/>
               <Input/>
            </div>
          </>

     )
}

export default Chating;