
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;



