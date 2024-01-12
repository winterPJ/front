import React, { useState, useEffect } from "react";
import NavbarLogin from "./navbarlogin";
import Navbar from "./navbar";

import "./InfoEdit.css";

export default function InfoEdit() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://back.mongjo.xyz/user/get/info", {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => res.nickname);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleNicknameSubmit = async (e) => {
    e.preventDefault();

    if (!nickname) {
      console.error("Nickname cannot be empty.");
      return;
    }

    fetch("http://back.mongjo.xyz/user/changeinfo/nickname", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res.data))
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다. TT");
      console.error("Passwords do not match.");
      return;
    }

    fetch("http://back.mongjo.xyz/user/changeinfo/password", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        passwordConfirm: confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res.data))
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <h2>회원정보수정</h2>
        <div className="edit2">
          <form className="edit" onSubmit={handleNicknameSubmit}>
            <label>
              Nickname:
              <input
                type="text"
                value={nickname || ""}
                onChange={(e) => setNickname(e.target.value)}
              />
            </label>
            <br />
            <input type="submit" value="닉네임 변경" />
          </form>
          <form className="edit" onSubmit={handlePasswordSubmit}>
            <label>
              Password:
              <input
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordMatchError && (
                <p style={{ color: "red" }}>{passwordMatchError}</p>
              )}
            </label>
            <br />
            <input type="submit" value="비밀번호 변경" />
          </form>
        </div>
        {showModal && (
          <div className="modal-background">
            <div className="modal-content">
              <h2>{modalMessage}</h2>
              <button onClick={() => setShowModal(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
