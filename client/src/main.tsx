import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Cart, Kitchen, Inventory } from "./routes";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";

const root = document.getElementById("root");

const queryClient = new QueryClient();

ReactDOM.createRoot(root!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense
      fallback={
        <h2 className="text-9xl font-bold flex justify-center items-center h-screen">
          {" "}
          Loading...
        </h2>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Nav />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/inventory" element={<Inventory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
    <ToastContainer position={"bottom-right"} theme={"light"} />
  </QueryClientProvider>,
);
