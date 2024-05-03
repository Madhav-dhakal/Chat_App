import React from "react";
import NavBar from "./navbar";
import Search from "./search";
import Chats from "./chats";


const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <NavBar/>
        <Search/>
        <Chats/>
      </div>
    </>
  );
};

export default Sidebar;
