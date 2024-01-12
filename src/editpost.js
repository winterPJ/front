import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import NavbarLogin from "./navbarlogin";
import "./editpost.css";

function EditPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

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
    fetch(`http://back.mongjo.xyz/post/get/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.post) {
          setTitle(data.post.title);
          setBody(data.post.body);
          setLoading(false);
        } else {
          console.error("Post not found");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching post", error);
        setLoading(false);
      });
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch(`http://back.mongjo.xyz/post/update/${postId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => res.json())
      .then((res) => alert(res.data));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {isLoggedIn ? <Navbar /> : <NavbarLogin />}

      <div className="editPostContainer">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit} className="editPostForm">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Content:
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <button type="submit">수정</button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
