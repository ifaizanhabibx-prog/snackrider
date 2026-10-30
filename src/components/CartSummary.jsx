import { useCart } from "../hooks/useCart";

function CartSummary() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const deliveryFee = subtotal > 0 ? 150 : 0;

  const total = subtotal + deliveryFee;

  return (
    <div className="mt-6 rounded-xl bg-white p-5 shadow-md">
      <h3 className="md-4 text-lg font-bold">Order Total</h3>

      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>Rs. {subtotal}</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Delivery Fee</span>
        <span>Rs. {deliveryFee}</span>
      </div>

      <div className="mt-2 flex justify-between border-t-2 border-neutral-200 py-2 text-lg font-bold text-brand">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>
    </div>
  );
}

export default CartSummary;
