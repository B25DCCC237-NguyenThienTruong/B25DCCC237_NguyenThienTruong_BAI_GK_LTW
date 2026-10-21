
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <h1>404</h1>
      <p>Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/">Quay lại trang chủ</Link>
    </div>
  );
}

export default NotFound;
