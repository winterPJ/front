import { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function registerHandler(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    fetch(`http://back.mongjo.xyz/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res["success"] === true) {
          alert(res["data"]);
          navigate("/");
        } else {
          alert(res["data"]);
        }
      });
  }

  return (
    <div className="wrapper">
      <div className="login-wrapper">
        <h2>로그인</h2>
        <form id="login-form" onSubmit={registerHandler}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="로그인" />
          <p>
            <a href="/">메인 화면으로 돌아가기</a>
          </p>
        </form>
      </div>
    </div>
  );
}
