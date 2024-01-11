import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./mainpage";
import Posting from "./posting";
import Login from "./login";
import SignUp from "./signup";
import DetailPost from "./detailpost";
import ProfileInfo from "./ProfileInfo";
import InfoEdit from "./InfoEdit";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detailpost/:postId" element={<DetailPost />} />
        <Route path="/profileinfo" element={<ProfileInfo />} />
        <Route path="/InfoEdit" element={<InfoEdit/>} />
      </Routes>
    </div>
  );
};

export default App;