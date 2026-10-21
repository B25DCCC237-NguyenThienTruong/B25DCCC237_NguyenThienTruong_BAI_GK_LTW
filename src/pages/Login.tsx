
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = login(username.trim(), password);

    if (success) {
      navigate("/create");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  }

  return (
    <div className="container">
      <h1>Đăng nhập</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Tên đăng nhập</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Đăng nhập</button>
      </form>

      
      <Link to="/">Quay lại</Link>
    </div>
  );
}

export default Login;
