import { useState } from "react";
import Restaurants from "../pages/Restaurants";

const categories = [
  { id: 1, name: "Biryani", icon: "🍛" },
  { id: 2, name: "Burgers", icon: "🍔" },
  { id: 3, name: "Pizza", icon: "🍕" },
  { id: 4, name: "Chinese", icon: "🍜" },
  { id: 5, name: "Drinks", icon: "🥤" },
];

function Home() {
  const [search, setSearch] = useState("");

  return (
    <section>
      <div className="home">
        <section className="bg-brand px-5 py-10 text-center text-white">
          <h1 className="text-4xl font-bold">Hungry? We've got you.</h1>
          <p className="mt-2 text-lg">
            Order food from your favorite restaurants.
          </p>

          <div className="mt-6 flex justify-center gap-2">
            <input
              className="w-full max-w-400px rounded-lg bg-white p-3 text-black"
              type="text"
              placeholder="Search for food or restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="cursor-pointer rounded-lg bg-[#222] px-5 py-3 text-white hover:bg-black">
              Search
            </button>
          </div>
        </section>
        <Restaurants />
      </div>
      {categories.map((cat) => (
        <div
          className="flex min-w-20 cursor-pointer flex-col items-center gap-2 rounded-xl bg-white p-4 shadow-md hover:bg-brand-white"
          key={cat.id}
        >
          <span className="text-3xl">{cat.icon}</span>
          <span>{cat.name}</span>
        </div>
      ))}
    </section>
  );
}

export default Home;
