import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const Kitchen = lazy(() => import("./pages/kitchen"));

export { Home, Cart, Kitchen };
