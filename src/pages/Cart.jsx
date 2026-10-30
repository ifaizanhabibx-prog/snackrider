import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const isEmpty = cartItems.length === 0;

  return (
    <section className="mx-auto max-w-700px px-5 py-10">
      <h2 className="mb-6 text-center text-2xl font-bold">Shopping Cart</h2>

      {isEmpty && (
        <div className="flex flex-col gap-4">
          <p className="rounded-xl bg-brand-light p-5 text-center text-brand">
            Your cart is empty. Add something tasty!
          </p>
          <span>Total: Rs. {total}</span>
        </div>
      )}

      {isEmpty &&
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <CartItem item={item} />
          </div>
        ))}

      <Link
        to="/checkout"
        className="mt-6 block rounded-lg bg-brand p-3 text-center text-white"
      >
        Proceed to checkout
      </Link>
    </section>
  );
}

export default Cart;
