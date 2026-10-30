import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

const links = [
  { id: 1, label: "Home", to: "/" },
  { id: 2, label: "Cart", to: "/cart" },
  { id: 3, label: "Checkout", to: "/checkout" },
  { id: 4, label: "Track Order", to: "/tracking" },
];

function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  return (
    <nav className="flex item-center justify-between bg-brand px-8 py-4 text-white">
      <Link to="/cart" className="flex items-center gap-2 font-bold">
        🛒 Cart
        {cartCount > 0 && (
          <span className="flex h-5.5 min-w-5.5 items-center justify-center rounded-full bg-white px-1.5 text-[13px] text-brand">
            {cartCount}
          </span>
        )}
      </Link>
      <Link to="/">
        <h1 className="text-2xl font-bold">SnackRider</h1>
      </Link>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive ? "font-bold underline" : "hover:underline"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
        {user ? (
          <div className="flex items-center gap-3">
            <span>Hi, {user.name}</span>
            <button
              className="cursor-pointer rounded-lg border-2 border-white px-3.5 py-1.5 text-white hover:bg-white hover:text-brand"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-lg border-0 border-white px-3.5 py-1.5 text-white hover:bg-white hover:text-brand"
          >
            Login
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
