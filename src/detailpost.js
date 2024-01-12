import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HotPosts from "./hotpost";
import MemberList from "./memberlist";
import Navbar from "./navbar";
import NavbarLogin from "./navbarlogin";
import "./detailpost.css";

function DetailPost() {
  const [post, setPost] = useState(null);
  const [nickname, setNickname] = useState("");
  const [comments, setComments] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [newComment, setNewComment] = useState("");
  const [commentUser, setCommentUser] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching post details for ID:", postId);

        const postResponse = await fetch(
          `http://back.mongjo.xyz/post/${postId}` //${postId} 20
        );
        const postData = await postResponse.json();

        if (postData && postData.user_id) {
          const userResponse = await fetch(
            `http://back.mongjo.xyz/user/${postData.user_id}` //${postData.user_id} 13
          );
          const userData = await userResponse.json();

          if (userData && userData.nickname) {
            setNickname(userData.nickname);
            setPost(postData);

            const commentsResponse = await fetch(
              `http://back.mongjo.xyz/post/${postId}/comment` //${postId} 20
            );
            const commentsData = await commentsResponse.json();
            if (commentsData) {
              const formattedComments = commentsData.map((comment) => {
                const date = new Date(comment.created_at);
                comment.created_at = `${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
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

  useEffect(() => {
    const checkEditPermission = async () => {
      try {
        const response = await fetch(
          `http://back.mongjo.xyz/user/matching/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ post_id: postId }),
          }
        );
        const data = await response.json();
        if (data.success) {
          setCanEdit(true);
        }
      } catch (error) {
        console.error("Checking edit permission failed:", error);
      }
    };

    if (post) {
      checkEditPermission();
    }
  }, [post, postId]);

  const handleEditClick = () => {
    navigate(`/editpost/${postId}`);
  };

  const handleCreateComment = (event) => {
    event.preventDefault();
    fetch(`http://back.mongjo.xyz/comment/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: postId,
        body: newComment,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res.data))
      .then(() => navigate(`/detailpost/${postId}`))
      .catch((error) => console.error("Creating comment failed:", error));
  };

  return (
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarLogin />}
      <div className="pageLayout">
        <MemberList />
        <div className="mainContent">
          {post ? (
            <div>
              <div className="titleBox">
                <h4>{post.title}</h4>
                <div className="postDetails">
                  <span className="postTime">{post.created_at}</span>
                  <span className="author">글쓴이: {nickname}</span>
                  {canEdit && (
                    <button onClick={handleEditClick}>수정하기</button>
                  )}
                </div>
              </div>
              <div className="contentBox">
                <p>{post.body}</p>
              </div>
              <div className="commentsSection">
                <h5>댓글</h5>
                <ul>
                  {comments.map(
                    (comment, index) => (
                      fetch(`http://back.mongjo.xyz/user/${comment.user_id}`)
                        .then((res) => res.json())
                        .then((res) => {
                          setCommentUser(res.nickname);
                        }),
                      (
                        <li key={index} className="commentBox">
                          <p>작성자 : {commentUser}</p>
                          <p>{comment.body}</p>
                          <span className="commentTime">
                            {comment.created_at}
                          </span>
                        </li>
                      )
                    )
                  )}
                </ul>
              </div>
              {isLoggedIn && (
                <div className="commentForm">
                  <form className="formArea">
                    <textarea
                      className="commentArea"
                      placeholder="댓글을 입력하세요."
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className="commentBtn" type="submit">
                      등록
                    </button>
                  </form>
                </div>
              )}
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
