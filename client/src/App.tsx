import { Route, Routes, BrowserRouter } from "react-router";
import NavBar from "./components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import Menu from "./pages/Menu";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Kitchen from "./pages/Kitchen";
import Metrics from "./pages/Metrics"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CartProvider } from "./context/CartContext";

// Example: import { Button } from "@/components/ui/button";
const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <CartProvider>
        <BrowserRouter>
          <div className="bg-[url('/YesChefBackground.png')] bg-cover bg-center bg-no-repeat min-h-screen bg-fixed md:bg-cover md:bg-center sm:bg-contain sm:bg-top">
            <div className="m-6">
              <NavBar />
              <div className="md:ml-4">
                <Toaster position="top-right" />
                <Routes>
                  <Route path="/" element={<Menu />}></Route>
                  <Route path="/inventory" element={<Inventory />}></Route>
                  <Route path="/kitchen" element={<Kitchen />}></Route>
                  <Route path="/reports" element={<Reports />}></Route>
                  <Route path="reports/metrics/:id" element={<Metrics />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
