import { BrowserRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Admin from "./pages/Admin";
import BlogPostDetail from "./components/BlogPostDetail";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    
    
    <HashRouter>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogPostDetail />} />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute >
          } />
        </Routes>
      </div>
    </HashRouter>
  );
}
