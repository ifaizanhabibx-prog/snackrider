import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Some fields are stil missing.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <section className="mx-auto max-w-400px px-5 py-10" onSubmit={handleSubmit}>
      <h2 className="mb-6 text-xl text-center font-bold">Create Account</h2>
      <p className="text-center text-red-600">{error}</p>
      <form className="flex flex-cols gap-4">
        <input
          type="text"
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          value={name}
          placeholder="Enter your full name."
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          value={email}
          placeholder="Enter your Phone or email."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          value={password}
          placeholder="Enter correct password."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-brand p-3 text-base text-white hover:bg-[#e55a28]"
        >
          Sign up
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-brand underline">
          Login
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-brand underline">
          Sign up
        </Link>
      </p>
    </section>
  );
}

export default Register;
