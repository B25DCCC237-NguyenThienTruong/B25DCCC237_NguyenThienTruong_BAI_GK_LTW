import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function CreatePost() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    const newPost = {
      userId: 1,
      id:1,
      title: cleanTitle,
      body: cleanBody,
    };

    try {
      const savedPosts = localStorage.getItem("myPosts");
      const posts = savedPosts ? JSON.parse(savedPosts) : [];

      if (!Array.isArray(posts)) {
        throw new Error("không hợp lệ");
      }

      posts.unshift(newPost);
      localStorage.setItem("myPosts", JSON.stringify(posts));

      navigate("/");
    } catch {
      setError("Không thể lưu bài viết. Vui lòng thử lại!");
    }
  }

  return (
    <div className="container">
      <h1>Viết bài mới</h1>
      <p className="subtitle">Chia sẻ </p>

      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Tiêu đề</label>
        <input
          id="title"
          type="text"
          placeholder="Nhập tiêu đề"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="body">Nội dung</label>
        <textarea
          id="body"
          placeholder="Nhập nội dung bài viết"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={8}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Đăng bài</button>
      </form>

      <Link to="/">Quay lại</Link>
    </div>
  );
}

export default CreatePost;
