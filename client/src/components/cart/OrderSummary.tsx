import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import type { ICartItem } from "./CartInterfaces";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { labels } from "../../static/labels";
import { handleOrder } from "./handleOrder";

const OrderSummary = memo(() => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/cart`).then((res) =>
        res.json(),
      ),
  });

  if (isPending) {
    return labels.OrderSummary.loading;
  } else if (error) {
    return labels.OrderSummary.error + error;
  }

  const subtotal = Number(
    data
      .reduce(
        (total: number, item: ICartItem) => total + item.price * item.quantity,
        0,
      )
      .toFixed(2),
  );
  const tax = Number((subtotal * 0.07).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <Card className="sticky top-0 w-full h-[225px]">
      <CardHeader>
        <CardTitle className="pt-4">
          {labels.OrderSummary.orderSummary}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-full flex justify-between">
          <h3>{labels.OrderSummary.subtotal}</h3>
          <h3>${subtotal}</h3>
        </div>
        <div className="w-full flex justify-between">
          <h3>{labels.OrderSummary.tax}</h3>
          <h3>${tax}</h3>
        </div>
        <div className="w-full flex justify-between">
          <h3>{labels.OrderSummary.total}</h3>
          <h3>${total}</h3>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick = {()=>{handleOrder({cart: data})}}>{labels.OrderSummary.checkout}</Button>
      </CardFooter>
    </Card>
  );
});

export default OrderSummary;
