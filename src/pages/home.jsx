import React from "react";
import Sidebar from "../components/sidebar";
import Chating from "../components/chat";

const HomePage = () => {
  return (
    <>
      <div className="home">
        <div className="Container">
          <Sidebar />
          <Chating/>
          
        </div>
      </div>
    </>
  );
};
export default HomePage;
