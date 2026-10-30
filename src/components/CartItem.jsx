function CartItem({ item }) {
  return (
    <div className="cart-row">
      <h3>{item.name}</h3>
      <span className="row-qty">X {item.qty}</span>
      <span className="row-price">Rs. {item.price * item.qty}</span>
    </div>
  );
}

export default CartItem;
