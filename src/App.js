import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ProfileInfo from "./ProfileInfo";
import InfoEdit from "./InfoEdit"; 

const App = () => {
  return (
      <div style={{ textAlign: "center" }}>
        <h2 style={{ padding: "20px", fontSize: "40px", fontFamily: "Poppins" }}>
          <Link to="/">My Page</Link>
        </h2>
        <hr />

        <Routes>
          <Route path="/" element={<ProfileInfo />} />
          <Route path="/InfoEdit" element={<InfoEdit />} />
        </Routes>
      </div>
  );
}

export default App;
