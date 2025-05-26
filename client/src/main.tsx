import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import {lazy} from "react"
import "./index.css"

const Home = lazy(() => import("./pages/home"));
const Kitchen = lazy(() => import("./pages/kitchen"));

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kitchen" element={<Kitchen />} />
    </Routes>
  </BrowserRouter>
);
