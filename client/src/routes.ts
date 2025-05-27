import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));

export { Home, Cart };
