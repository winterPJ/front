import React, { useState } from "react";
import Navbar from './navbar';

import "./InfoEdit.css";

export default function InfoEdit() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword , setconfirmPassword ] = useState("");

  function handleNicknameSubmit(event) {
    event.preventDefault();
    
    if (nickname == "" ) {
      alert("닉네임을 입력해주세요!");
      return;
    }

    fetch(`http://back.mongjo.xyz/user/changeinfo/nicknam`, {
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
    .then((res) => {
      console.log(res);
      alert(res["data"]);
    });
  }

  function handlePasswordSubmit(event) {
    event.preventDefault();
    if (
      password == "" ||
      confirmPassword == ""
    ) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호를 다르게 입력했습니다!");
      return;
    }

    fetch(`http://back.mongjo.xyz/user/signup`, {
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
    .then((res) => {
      console.log(res);
      alert(res["data"]);
    });
  }

  return (
    <div>
        <Navbar />
        <div className="wrapper">
            <h2>회원정보수정</h2>
            <div className="edit2">
                <form className="edit" onSubmit={handleNicknameSubmit}>
                    <label>
                        Nickname:
                        <input type="text" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)} />
                    </label>
                    <br />
                    <input type="submit" value="닉네임 변경" />
                </form>
                <form className="edit" onSubmit={handlePasswordSubmit}>
                    <label>
                        Password:
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Confirm Password:
                        <input type="password" placeholder="Password Confirm" onChange={(e) => setconfirmPassword(e.target.value)} />
                    </label>
                    <br />
                    <input type="submit" value="비밀번호 변경" />
                </form>
            </div>
        </div>
    </div>
  );
}
