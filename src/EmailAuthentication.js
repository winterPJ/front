import React from 'react';
import './EmailAuthentication.css';

export default function EmailAuthentication() {
    return (
        <div   div className="container">
            <h1>이메일 인증</h1>
            <div className="row">
                <div className="input-container">
                    <input type="email" placeholder="Email" />
                </div>
                <button id="sendCodeButton">코드 발송</button>
            </div>
            <div className="auth-code-input">
                <input type="text" placeholder="Auth_code" />
            </div>
            <button id="submitButton">완료</button>
        </div>
    );
}