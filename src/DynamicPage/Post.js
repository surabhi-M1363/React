import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Pages.css";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null); //add error state.

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`); // Corrected URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); //handling non 200 responses.
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err); //set error state.
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <div className="error">Error: {error.message}</div>; //display error message.
  }

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="page post">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;