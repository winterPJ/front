import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotPosts from './hotpost';
import MemberList from './memberlist';
import Navbar from './navbar';
import "./detailpost.css";

function DetailPost() {
    const [post, setPost] = useState(null);
    const [nickname, setNickname] = useState('');
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching post details for ID:', postId);
    
                const postResponse = await fetch(`http://back.mongjo.xyz/post/${postId}`);
                const postData = await postResponse.json();
    
                if (postData && postData.user_id) {
                    const userResponse = await fetch(`http://back.mongjo.xyz/user/${postData.user_id}`);
                    const userData = await userResponse.json();
    
                    if (userData && userData.nickname) {
                        setNickname(userData.nickname);
                        setPost(postData);

                        const commentsResponse = await fetch(`http://back.mongjo.xyz/post/${postId}/comment`);
                        const commentsData = await commentsResponse.json();
                        if (commentsData) {
                            const formattedComments = commentsData.map(comment => {
                                const date = new Date(comment.created_at);
                                comment.created_at = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
                                return comment;
                            });
                            setComments(formattedComments);
                        }
                    } else {
                        console.error("No user data found.");
                    }
                } else {
                    console.error("No post found with the given ID.");
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
        };
        fetchData();
    }, [postId]);

return (
    <div>
        <Navbar />
        <div className="pageLayout">
            <MemberList />
            <div className="mainContent">
                {post ? (
                    <div>
                        <div className="titleBox">
                            <h4>{post.title}</h4>
                            <span className="author">글쓴이: {nickname}</span>
                            <span className="postTime">{post.created_at}</span>
                        </div>
                        <div className="contentBox">
                            <p>{post.body}</p>
                        </div>
                        <div className="commentsSection">
                            <h5>댓글</h5>
                            <ul>
                                {comments.map((comment, index) => (
                                    <li key={index} className="commentBox">
                                        <p>{comment.body}</p>
                                        <span className="commentTime">{comment.created_at}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <HotPosts />
        </div>
    </div>
);

}

export default DetailPost;
