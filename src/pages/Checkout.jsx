import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { ROUTES } from "../utils/constants";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    if (!name || !phone || !address) {
      alert("Please fill in all the fields");
      return;
    }

    clearCart();
    navigate("/tracking");

    alert(`Thank you ${name}! your order of Rs. ${total} is on the way.`);

    navigate("/tracking");

    navigate(ROUTES.TRACKING);
  };
  return (
    <section className="mx-auto max-w-700px px-5 py-10">
      <h2 className="mb-6 text-center text-2xl font-bold">Checkout</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="phone"
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          placeholder="Enter your phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          name="address"
          className="rounded-lg border border-neutral-300 bg-white p-3 text-base"
          placeholder="Enter your home address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <textarea
          name="text"
          className="min-h-20 resize-y rounded-lg border border-neutral-300 bg-white p-3 text-base"
          placeholder="Type anything you want to express about the items"
        ></textarea>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-brand p-3 text-base text-white hover:bg-[#e55e28]"
        >
          Place order
        </button>
      </form>

      <div className="mt-8 rounded-xl bg-white p-5 shadow-md">
        <h3 className="mb-4 text-lg font-bold">Order Summary</h3>

        {cartItems.map((item) => (
          <div className="flex justify-between py-2" key={item.id}>
            <span>
              {item.name} x {item.qty}
            </span>
            <span>Rs {item.price * item.qty}</span>
          </div>
        ))}

        <div className="mt-2 flex justify-between border-t-2 border-neutral-200 py-2 font-bold">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
