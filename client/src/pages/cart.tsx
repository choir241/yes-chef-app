import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import type { ICartItem } from "@/components/cart/CartInterfaces";
import { useQuery } from "@tanstack/react-query";
import { useCallback, memo } from "react";
import { labels } from "@/static/labels";

const Cart = memo(() => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/cart`).then((res) =>
        res.json(),
      ),
  });

  const renderCart = useCallback(() => {
    if (isPending) {
      return labels.OrderSummary.loading;
    } else if (error) {
      return labels.OrderSummary.error + error;
    } else {
      return data.map((item: ICartItem) => (
        <CartItem key={item.name} item={item} />
      ));
    }
  }, [isPending, error, data]);

  return (
    <>
      <h1 className="px-4 py-2 text-2xl font-bold">{labels.cart.cart}</h1>
      <section className="p-4 flex w-full gap-4 items-start">
        <section className="flex flex-col w-full">{renderCart()}</section>
        <OrderSummary />
      </section>
    </>
  );
});

export default Cart;
