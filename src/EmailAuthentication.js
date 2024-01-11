import React from 'react';
import { useLocation } from 'react-router-dom';
import './EmailAuthentication.css';

export default function EmailAuthentication() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    return (
        <div className="container">
            <h2>이메일 인증</h2>
            <div className="row">
                {/* Display the email */}
                <p>Email: {email}</p>
                <button id="sendCodeButton">인증번호 발송</button>
            </div>
            <div className="auth-code-input">
                <input type="text" placeholder="Auth_code" />
            </div>
            <button id="submitButton">완료</button>
        </div>
    );
}