import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/" />; // If not admin, redirect to Home
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
}
