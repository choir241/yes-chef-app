import CartItem from "@/components/cart/CartItem";
import OrderSummary, { mockCart } from "@/components/cart/OrderSummary";
import type { ICartItem } from "@/components/cart/CartInterfaces";

export default function Cart() {
  return (
    <>
      <h1 className="px-4 py-2 text-2xl font-bold">Cart</h1>
      <section className="p-4 flex w-full gap-4 items-start">
        <section className="flex flex-col w-full">
          {mockCart.map((item: ICartItem) => (
            <CartItem key={item.name} item={item} />
          ))}
        </section>
        <OrderSummary />
      </section>
    </>
  );
}
