import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "./navbarlogin";
import Navbar from "./navbar";
import "./ProfileInfo.css";

export default function ProfileInfo(props) {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [post_cnt, setPost] = useState("");
  const [comment_cnt, setCount] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();
  const handleLogout = () => {
    fetch("http://back.mongjo.xyz/user/logout",
    {
      method: "POST"
    }).then((res) => res.json())
    .then((res) => alert(res.data))
    .catch((error) => alert(error))
    navigate("/");
  };

  useEffect(() => {
    fetch("http://back.mongjo.xyz/user/13")
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setId(data.id);
        setNickname(data.nickname);
        setPost(data.post_cnt);
        setCount(data.comment_cnt);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditClick = () => {
    navigate("/InfoEdit", {
      state: {
        email,
        id,
        nickname,
        post_cnt,
        comment_cnt,
      },
    });
  };

  return (
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarLogin />}
      <div className="layout">
        <div className="side"></div>
        <div className="Mypage">
          <div className="info">
            <img
              src="/images/ProfileLogo.png"
              alt="Profile"
              className="profileimg"
            />
            <h4>
              <span style={{ color: "#1e90ff" }}>{nickname}</span>님!
              환영합니다.
            </h4>

            <hr />

            <div className="email">
              <p>
                <span>
                  <b>이메일: </b>
                </span>
                {email}
              </p>
            </div>

            <div className="post_cnt">
              <p>
                <span>
                  <b>글 작성 수: </b>
                </span>
                {post_cnt}
              </p>
            </div>

            <div className="comment_cnt">
              <p>
                <span>
                  <b>댓글 작성 수: </b>
                </span>
                {comment_cnt}
              </p>
            </div>

            <div>
              <button onClick={handleEditClick}>회원정보수정</button>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          </div>
        </div>
        <div className="side"></div>
      </div>
    </div>
  );
}
