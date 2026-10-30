import { restaurants } from "../data/restaurants";
import { menus } from "../data/menu";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRestaurants() {
  await delay(500);
  return restaurants;
}
export async function getRestaurantById(id) {
  await delay(300);
  const restaurant = restaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    throw new Error("Restaurants not found.");
  }

  return restaurant;
}
export async function getMenu(restaurantId) {
  await delay(300);
  return menus[restaurantId] || [];
}
