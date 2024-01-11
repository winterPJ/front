import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './hotpost.css';

function HotPosts() {
    const [posts, setPosts] = useState([]);
    const [hotPosts, setHotPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        /* const sessionToken = sessionStorage.getItem('sessionToken');
            setIsLoggedIn(!!sessionToken); */
    
        fetch("http://back.mongjo.xyz/post/get")
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
            const sortedPosts = [...data].sort(
              (a, b) => b.comment_cnt - a.comment_cnt
            );
            setHotPosts(sortedPosts.slice(0, 3));
          })
          .catch((error) => console.error("Fetching posts failed:", error));
      }, []);

    const goToHotPostDetail = (postId) => {
        navigate(`/detailpost/${postId}`);
      };

    return (
        <div className="hotpost">
          <h4>핫게</h4>
          <ul>
            {hotPosts.map((post, index) => (
              <li
                key={post.id}
                onClick={() => goToHotPostDetail(post.id)}
                style={{ cursor: "pointer" }}
              >
                {index + 1}등: {post.title}
              </li>
            ))}
          </ul>
        </div>
    );
}

export default HotPosts;
