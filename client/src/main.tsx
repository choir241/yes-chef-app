import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Cart } from "./routes";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const root = document.getElementById("root");

const queryClient = new QueryClient();

ReactDOM.createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>,
);
