import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const goToMainPage = () => {
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/profileinfo');
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
