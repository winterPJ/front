import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileInfo.css";

export default function ProfileInfo(props) {
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('')

  const navigate = useNavigate();
  const handleLogout = () => {
    // 세션 또는 토큰을 지우고 로그인 화면으로 이동
    // 이 부분은 실제 사용 중인 인증 방식에 따라 다를 수 있습니다.
    // 여기서는 단순히 세션을 클리어하고 홈 페이지로 이동하는 예시를 보여줍니다.
    sessionStorage.clear(); // 세션 클리어
    navigate('/'); // 홈 페이지로 이동
  };

  useEffect(() => {
    fetch("http://back.mongjo.xyz/")
      .then(res => res.json())
      .then(data => {
        setEmail(data.email);
        setId(data.id);
        setNickname(data.nickname);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEditClick = () => {
    navigate('/InfoEdit', {
      state: {
        email,
        id, 
      },
    });
  };


  return (
    <div className="Mypage">
      <img src="/images/img.jpg"
           alt="Profile" 
           className="profilePicture" />
      <h4>{nickname} 님! 환영합니다.</h4>

      <div className="email">
        <p><span>이메일</span>{email}</p>
      </div>

      <div className="count">
        <p>댓글 작성 수</p>
      </div>

      <div>
        <button onClick={handleEditClick}>회원정보수정</button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </div>
  );
}
