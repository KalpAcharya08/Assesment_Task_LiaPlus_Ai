import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Blog Platform</h1>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
        <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded">Signup</Link>
      </div>
    </div>
  );
}
