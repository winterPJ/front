import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbarlogin.css";

function NavbarLogin() {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate("/");
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToSignUpPage = () => {
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="logoSection">
        <img
          src="/images/Mongeul.jpg"
          alt="Logo"
          className="logo"
          onClick={goToMainPage}
        />
      </div>
      <div className="navTitleSection">
        <span className="navTitle">Mongeul</span>
      </div>
      <div className="buttonsSection">
        <button onClick={goToLoginPage} className="navButton">
          로그인
        </button>
        <button onClick={goToSignUpPage} className="navButton">
          회원가입
        </button>
      </div>
    </nav>
  );
}

export default NavbarLogin;
