export default function EmailAuthentication(){

    const [auth_code, setEmail] = useState("");
    
    return(
        <>
        <h2>이메일 인증</h2>
        <input id="auth_code" type="text" placeholder="xxxxxx"/>
        <button>코드입력</button>
        </>
    )
}