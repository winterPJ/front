import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailPost() {
    const [postDetails, setPostDetails] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        fetch(`http://back.mongjo.xyz/post/get/${postId}`)
            .then(response => response.json())
            .then(data => {
                setPostDetails(data);
            })
            .catch(error => console.error("Fetching post details failed:", error));
    }, [postId]);

    return (
        <div>
            <h2>{postDetails.title}</h2>
            <p>{postDetails.body}</p>
            {/* 여기에 댓글 목록 등 추가 정보를 렌더링할 수 있습니다 */}
        </div>
    );
}

export default DetailPost;
