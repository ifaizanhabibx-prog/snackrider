import { useState } from "react";
import { CartContext } from "./CartContextValue";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (item) => {
    const exists = cartItems.find((i) => i.id === item.id);

    if (exists) {
      setCartItems(
        cartItems.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)),
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(
      cartItems
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
