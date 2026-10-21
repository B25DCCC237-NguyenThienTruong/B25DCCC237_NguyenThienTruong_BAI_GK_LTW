
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPostDetail() {
      try {
        setLoading(true);
        setError("");

        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!postResponse.ok) {
          throw new Error("Không thể tải bài viết");
        }

        const postData: Post = await postResponse.json();

        if (!postData.id) {
          throw new Error("Không tìm thấy bài viết");
        }

        const commentResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );

        if (!commentResponse.ok) {
          throw new Error("Không thể tải bình luận");
        }

        const commentData: Comment[] = await commentResponse.json();

        setPost(postData);
        setComments(commentData);
      } catch {
        setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }

    getPostDetail();
  }, [id]);

  if (loading) {
    return <p className="message">Đang tải chi tiết bài viết...</p>;
  }

  if (error) {
    return (
      <div className="container">
        <p className="message error">{error}</p>
        <Link to="/">Quay lại trang chủ</Link>
      </div>
    );
  }

  if (!post) {
    return <p className="message">Không tìm thấy bài viết.</p>;
  }

  return (
    <div className="container">
      <Link to="/">← Quay lại trang chủ</Link>

      <article className="post-card detail-card">
        <small>Bài viết số {post.id}</small>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>

      <section className="comments-section">
        <h2>Bình luận ({comments.length})</h2>

        {comments.map((comment) => (
          <article className="comment-card" key={comment.id}>
            <h3>{comment.name}</h3>
            <p className="comment-email">{comment.email}</p>
            <p>{comment.body}</p>
          </article>
        ))}

        {comments.length === 0 && (
          <p>Chưa có bình luận nào.</p>
        )}
      </section>
    </div>
  );
}

export default PostDetail;
