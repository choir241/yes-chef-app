import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const Kitchen = lazy(() => import("./pages/kitchen"));

export { Home, Kitchen };
