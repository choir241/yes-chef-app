import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const Kitchen = lazy(() => import("./pages/kitchen"));
const Inventory = lazy(() => import("./pages/inventory"));

export { Home, Cart, Kitchen, Inventory };
