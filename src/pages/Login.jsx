import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };
  return (
    <section className="mx-auto max-w-400px px-5 py-10">
      <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

      <form className="flex flex-cols gap-4" onSubmit={handleSubmit}>
        <input
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          type="password"
          placeholder="Enter right password here..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-center text-red-600">{error}</p>}

        <button
          type="submit"
          className="rounded-lg border-none px-3.5 py-1.5 text-brand cursor-pointer"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
