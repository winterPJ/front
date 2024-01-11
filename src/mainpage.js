import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "./navbarlogin";
import Navbar from "./navbar";
import "./mainpage.css";

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hotPosts, setHotPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://back.mongjo.xyz/user/check", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        console.info(res["data"]);
        res["success"] ? setIsLoggedIn(true) : setIsLoggedIn(false);
      });
  }, []);

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

  const goToPostingPage = () => {
    navigate("/posting");
  };

  const goToHotPostDetail = (postId) => {
    navigate(`/detailpost/${postId}`);
  };

  const goToDetailPage = (postId) => {
    navigate(`/detailpost/${postId}`);
  };

  const calcTime = (datetime) => {
    const inputDate = new Date(datetime).getTime();
    const currentDate = new Date().getTime();
    const diff = currentDate - inputDate;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 7) {
      return `${days}일 전`;
    } else {
      const date = new Date(datetime);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    }
  };

  return (
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarLogin />}
      {/* <Navbar />
            <NavbarLogin /> */}

      <div className="pageLayout">
        <div className="sidebar">게시판 참여자 목록</div>
        <div className="mainContent">
          <h3>게시글 현황</h3>
          {Array.isArray(posts) &&
            posts.map((post) => (
              <div
                key={post.id}
                className="post"
                onClick={() => goToDetailPage(post.id)}
              >
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <div className="commentCount">댓글 수: {post.comment_cnt}</div>
                <div className="postTime">{calcTime(post.created_at)}</div>
              </div>
            ))}
          {isLoggedIn && (
            <div className="writeButtonContainer">
              <button onClick={goToPostingPage} className="writeButton">
                글쓰기
              </button>
            </div>
          )}
        </div>
        <div className="sidebar">
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
      </div>
    </div>
  );
}

export default MainPage;
