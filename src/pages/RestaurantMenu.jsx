import { useCart } from "../hooks/useCart";
import { useState, useEffect } from "react";
import { getRestaurantById, getMenu } from "../services/restaurantService";
import { formatPrice } from "../utils/formatPrice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function RestaurantMenu() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (!id) return;

    getRestaurantById(id)
      .then((data) => {
        setRestaurant(data);
        setError("");
      })
      .catch((err) => {
        setRestaurant(null);
        setError(err.message);
      });
    getMenu(id).then((list) => setMenu(list));
  }, [id]);

  const dishes = id ? menu : [];

  if (error) {
    return (
      <section className="mx-auto max-w-700px px-5 py-10 text-center">
        <p className="text-red-600">{error}</p>
        <Link to="/" className="mt-4 inline-block text-brand underline">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-700px px-5 py-10">
      <h1 className="mb-6 text-center text-2xl font-bold">
        {id && restaurant ? restaurant.name : "Menu"}
      </h1>
      <p>{formatPrice(1260)}</p>
      <div className="flex flex-col gap-4">
        {dishes.map((item) => (
          <div
            className="flex items-center rounded-xl bg-white px-5 py-4 shadow-sm"
            key={item.id}
          >
            <h2 className="text-lg font-bold">{item.name}</h2>
            <span className="ml-auto mr-4 font-bold text-brand">
              Rs {item.price}
            </span>
            <button
              className="cursor-pointer rounded-lg bg-[#222] px-4 py-2 text-white hover:bg-brand"
              onClick={() => addToCart(item)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RestaurantMenu;
