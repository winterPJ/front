import React, { useState, useEffect } from "react";
import NavbarLogin from './navbarlogin';
import Navbar from './navbar';

import "./InfoEdit.css";

export default function InfoEdit() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (passwordMatchError) {
      setPasswordMatchError(null);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://back.mongjo.xyz/user/13");

        if (response.ok) {
          const userData = await response.json();
          setNickname(userData.nickname);
          setPassword(userData.password);
        } else {
          console.error("Failed to fetch user information.");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleNicknameSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://back.mongjo.xyz/user/13", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
        }),
      });

      if (response.ok) {
        console.log("Nickname updated successfully!");
        setModalMessage('닉네임이 성공적으로 변경되었습니다.');
        setShowModal(true);
      } else {
        console.error("Failed to update nickname.");
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다. TT");
      console.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://back.mongjo.xyz/user/13", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      if (response.ok) {
        console.log("Password updated successfully!");
        setModalMessage('비밀번호가 성공적으로 변경되었습니다.');
        setShowModal(true);
      } else {
        console.error("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
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
                        <input type="text" value={nickname || ''} onChange={handleNicknameChange} />
                    </label>
                    <br />
                    <input type="submit" value="닉네임 변경" />
                </form>
                <form className="edit" onSubmit={handlePasswordSubmit}>
                    <label>
                        Password:
                        <input type="password" value={password || ''} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input type="password" value={confirmPassword || ''} onChange={handleConfirmPasswordChange} />
                        {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>} 
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
