import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import type { ICartItem } from "@/components/cart/CartInterfaces";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export default function Cart() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:8000/cart").then((res) => res.json()),
  });

  const renderCart = useCallback(() => {
    if (isPending) {
      return "Loading cart...";
    } else if (error) {
      return "Error loading cart: " + error;
    } else {
      return data.map((item: ICartItem) => (
        <CartItem key={item.name} item={item} />
      ));
    }
  }, [isPending, error, data]);

  return (
    <>
      <h1 className="px-4 py-2 text-2xl font-bold">Cart</h1>
      <section className="p-4 flex w-full gap-4 items-start">
        <section className="flex flex-col w-full">{renderCart()}</section>
        <OrderSummary />
      </section>
    </>
  );
}
