import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function Home() {
  const { isLoggedIn, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không tả được bài ");
        }
        return response.json();
      })
      .then((data: Post[]) => {
        const savedPosts = localStorage.getItem("myPosts");
        const localPosts: Post[] = savedPosts
            ? JSON.parse(savedPosts)
            : [];

        setPosts([...localPosts, ...data]);
        setLoading(false);
      })
      .catch(() => {
        setError("Đã lỗi");
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="message">Đang tải bài </p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  return (
    <div className="container">
      
<div className="header-row">
  <div>
    <h1>MiniBlog</h1>
    
  </div>

  <div className="header-actions">
    {isLoggedIn ? (
      <>
        <Link to="/create">Viết bài mới</Link>
        <button onClick={logout}>Đăng xuất</button>
      </>
    ) : (
      <Link to="/login">Đăng nhập</Link>
    )}
  </div>
</div>

      <input
        className="search-input"
        type="text"
        placeholder="Tìm kiếm"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <p>CÓ {filteredPosts.length} bài viết</p>

      <div className="post-list">
        {filteredPosts.map((post) => (
          
            <article className="post-card" key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <small>Bài viết số {post.id}</small>

                <div>
                    <Link to={`/posts/${post.id}`}>Xem chi tiết </Link>
                </div>
            </article>

        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="message">Khoong tìm thấy bài viết phù hợp.</p>
      )}
    </div>
  );
}

export default Home;
