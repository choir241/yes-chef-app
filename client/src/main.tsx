import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Cart } from "./routes";
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </BrowserRouter>,
);
