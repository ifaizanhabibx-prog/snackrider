import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../components/Home";
import RestaurantMenu from "../pages/RestaurantMenu";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderTracking from "../pages/OrderTracking";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<RestaurantMenu />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/tracking" element={<OrderTracking />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
