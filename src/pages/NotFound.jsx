import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="mx-auto max-w-700px px-5 py-10 text-center">
      <h2 className="mb-2 text-2xl font-bold">404</h2>
      <p className="mb-6 text-neutral-600">This page does not exist.</p>
      <Link
        to="/"
        className="rounded-lg bg-brand px-6 py-3 text-white hover:bg-[#e55a28]"
      >
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;
