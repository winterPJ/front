import { useState } from "react";
import "./SignUp.css"

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    function registerHandler() {

        if(email == "" || nickname == "" || password == "" || passwordConfirm == "" ) {
            alert("모든 정보를 입력해주세요!");
            return;
        }

        if(password !== passwordConfirm) {
            alert("비밀번호를 다르게 입력했습니다!");
            return;
        }

        fetch(`http://back.mongjo.xyz/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                email: email,
                nickname: nickname,
                password: password,
                passwordConfirm: passwordConfirm
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if(res["success"] == false) {
                alert(res["data"]);
            } else {
                alert(res["data"]);
            }
        });
    }

    return (
        <div className="wrapper">
            <div className="login-wrapper">
                <h2>회원가입</h2>
                    <form id="login-form" onSubmit={registerHandler}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <input type="password" placeholder="Password Confirm" onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <input
                            type="submit"
                            value="회원가입"
                            />
                        <p><a href="/">메인 화면으로 돌아가기</a></p>
                    </form>
            </div>
        </div>
    );
}