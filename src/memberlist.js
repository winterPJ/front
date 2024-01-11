import React, { useEffect, useState } from 'react';
import './memberlist.css';

function MemberList() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetch("http://back.mongjo.xyz/user/count/post")
            .then((response) => response.json())
            .then((data) => {
                setMembers(data)
            })
            .catch((error) => console.error("Fetching member failed:", error));
    }, []);

    return (
        <div className="member">
            <h3>게시판 참여자 목록</h3>
            {Array.isArray(members) &&
            members.map((user) => (
              <div
                key={user.id}
                className="member"
              >
                <h4>{user.nickname}</h4>
              </div>
            ))}
        </div>
    );
}

export default MemberList;
