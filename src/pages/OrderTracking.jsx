import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import {
  placeOrder,
  advanceOrderStatus,
  getOrders,
} from "../services/orderService";

const stages = ["Order placed", "Preparing", "On the way", "Delivered"];

function OrderTracking() {
  const { cartItems, clearCart } = useCart();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    getOrders().then((list) => {
      const latest = list[0];

      if (latest && latest.status < 3) {
        setOrder(latest);
        setCurrentStage(latest.status);
      }
    });
  }, []);

  const handlePlaceOrder = async () => {
    setError("");

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    try {
      const newOrder = await placeOrder({ items: cartItems, total });
      setOrder(newOrder);
      setCurrentStage(newOrder.status);
      clearCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const nextStage = async () => {
    if (!order) return;

    try {
      const updated = await advanceOrderStatus(order.id);
      setOrder(updated);
      setCurrentStage(updated.status);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <section className="mx-auto max-w-700px px-5 py-10">
      <h2 className="mb-8 text-center text-2xl font-mono">Track your Order</h2>
      {order && (
        <p className="mb-6 text-center text-lg">
          Order <span className="font-bold text-brand">#{order.id}</span>{" "}
          placed.{" "}
        </p>
      )}

      {error && <p className="mb-6 text-center text-red-600">{error}</p>}

      {!order && (
        <button
          className="mx-auto mb-8 block cursor-pointer rounded-lg bg-brand px-6 py-3 text-white hover:bg-[#e55a28]"
          onClick={handlePlaceOrder}
        >
          Place order
        </button>
      )}
      <div className="flex flex-col gap-5">
        {stages.map((stage, index) => {
          const rowStyle =
            index < currentStage
              ? "text-green-600"
              : index === currentStage
                ? "font-bold text-brand"
                : "text-neutral-400";

          const dotStyle =
            index < currentStage
              ? "bg-green-600 text-white"
              : index === currentStage
                ? "bg-brand text-white"
                : "bg-neutral-200";
          <div className={`flex items-center gap-4 ${rowStyle}`} key={index}>
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full font-bold ${dotStyle}`}
            >
              {index + 1}
            </span>
            <span className="text-lg">{stage}</span>
          </div>;
        })}
      </div>
      <button
        className="mx-auto mt-8 block cursor-pointer rounded-lg bg-[#222] px-6 py-3 text-white text-base disabled:cursor-not-allowed disabled:bg-neutral-300"
        onClick={nextStage}
        disabled={!order || currentStage === stages.length - 1}
      >
        Next stage
      </button>
    </section>
  );
}

export default OrderTracking;
