import React, { useState, useEffect } from "react";

import "./InfoEdit.css";

export default function InfoEdit() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(null); // 추가

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
        const response = await fetch("http://back.mongjo.xyz/user/daewon");

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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError("비밀번호가 일치하지 않습니다.");
      console.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://back.mongjo.xyz/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: nickname,
          password: password,
        }),
      });

      if (response.ok) {
        console.log("User information updated successfully!");
      } else {
        console.error("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div>
        <h4>회원정보수정</h4>
        <div className="edit2">
            <form className="edit" onSubmit={handleEditSubmit}>
            <label>
                Nickname:
                <input type="text" value={nickname || ''} onChange={handleNicknameChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password || ''} onChange={handlePasswordChange} />
            </label>
            <br />
            <label>
                Confirm Password:
                <input type="password" value={confirmPassword || ''} onChange={handleConfirmPasswordChange} />
                {passwordMatchError && <p style={{ color: 'red' }}>{passwordMatchError}</p>} {/* 추가 */}
            </label>
            <br />
            <button type="submit">Update Information</button>
            </form>
        </div>
    </div>
    
  );
}
