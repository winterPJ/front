import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import NavbarLogin from './navbarlogin';
import './posting.css';

function Posting() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("http://back.mongjo.xyz/user/check", {
          method: "GET",
          credentials: "include",
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setIsLoggedIn(res["success"]);
          })
          .catch((error) => {
            console.error("Checking login status failed:", error);
            setIsLoggedIn(false);
          });
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch("http://back.mongjo.xyz/post/create", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title : title,
                body: content
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.data);
        })
        .catch(error => {
            alert("글 작성 실패:", error);
        });
    };

    return (
        <div>
            {isLoggedIn ? <Navbar /> : <NavbarLogin />}
            
            <div className="postingContainer">
                <h2>글 작성</h2>
                <form onSubmit={handleSubmit} className="postingForm">
                    <label>
                        제목:
                        <input 
                            type="text" 
                            name="title" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                        />
                    </label>
                    <label>
                        내용:
                        <textarea 
                            name="content" 
                            value={content} 
                            onChange={e => setContent(e.target.value)} 
                        />
                    </label>
                    <button type="submit">제출</button>
                </form>
            </div>
        </div>
    );
}

export default Posting;
