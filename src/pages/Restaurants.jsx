import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRestaurants, getMenu } from "../services/restaurantService";

function Restaurants({ addToCart }) {
  const { id } = useParams();

  const dishes = id ? menu : [];

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getRestaurants()
      .then((data) => setRestaurants(data))
      .catch(() => setError("Could not load restaurant. please try again."))
      .finally(() => setLoading(false));

    getMenu(id).then((dishes) => setMenu(dishes));
  }, [id]);

  if (error) {
    return <p className="p-10 text-center text-red-600">{error}</p>;
  }

  if (loading) {
    return <p className="p-10 text-center">Loading restaurants...</p>;
  }

  const restaurant = restaurants.find((r) => r.id === Number(id));
  return (
    <section className="px-5 py-10">
      <h2 className="mb-6 text-center text-2xl font-bold">
        {restaurant ? restaurant.name : "Menu"} {menu}
      </h2>
      <div className="mx-auto grid max-w-1000px grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5px">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/menu/${restaurant.id}`}
            className="block rounded-xl bg-white p-5 shadow-md hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-bold">{restaurant.name}</h3>

            <span className="inline-block rounded-full bg-brand-light px-2.5 py-1 text-sm text-brand">
              {restaurant.cuisine}
            </span>
            <div className="mt-3 flex justify-between text-sm text-neutral-600">
              <span>⭐ {restaurant.rating}</span>
              <span>🕒 {restaurant.time}</span>
            </div>
            {dishes.map((item) => {
              <div
                key={item.id}
                className="flex items-center rounded-xl bg-white px-5 py-4 shadow-sm"
              >
                <h3 className="text-lg font-bold">{item.name}</h3>
                <span className="ml-auto mr-4 font-bold text-brand">
                  Rs. {item.price}
                </span>
                <button
                  className="cursor-pointer rounded-lg bg-[#222] px-4 py-2 text-white hover:bg-brand"
                  onClick={() => addToCart(item)}
                >
                  Add
                </button>
              </div>;
            })}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Restaurants;
