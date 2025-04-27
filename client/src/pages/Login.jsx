import { LoginForm } from "../components/AuthForm";

export default function Login() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <LoginForm />
    </div>
  );
}
