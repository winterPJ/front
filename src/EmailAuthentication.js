import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EmailAuthentication.css';

export default function EmailAuthentication() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const [auth_code, setAuth_code] = useState("");

    const sendAuthCode = () => {
        fetch(`http://back.mongjo.xyz/auth/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res["success"] == false) {
                alert(res["data"]);
            } else {
                alert(res["data"]);
            }
        });
    };

    return (
        <div className="container">
            <h2>이메일 인증</h2>
            <div className="row">
                {/* Display the email */}
                <p>Email: {email}</p>
                <input id="sendCodeButton" type="submit" value="인증코드 발송" onClick={sendAuthCode}/>
            </div>
            <div className="auth-code-input">
                <input type="text" placeholder="Auth_code" />
            </div>
            <input id="submitButton" type="submit" value="완료"/>
        </div>
    );
}