import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    const navigate = useNavigate();
    /* const username = localStorage.getItem('username'); */

    const goToMainPage = () => {
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/profileinfo');
    };

    /* const handleLogout = () => {
        localStorage.removeItem('username'); // 로컬 스토리지에서 사용자 이름 제거
        navigate('/'); // 메인 페이지로 이동
    };
    */

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
            <div className="profileSection">
            {/*
            {username && (
                    <img 
                        src="/images/ProfileLogo.png"
                        alt="Profile" 
                        className="profilePicture" 
                        onClick={goToProfile}
                    />
            )}
            */}
           <img 
                src="/images/ProfileLogo.png"
                alt="Profile" 
                className="profilePicture" 
                onClick={goToProfile}
            />

            
            </div>
        </nav>
    );
}

export default Navbar;
