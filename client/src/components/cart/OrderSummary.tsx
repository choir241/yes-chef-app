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

const OrderSummary = memo(() => {

  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:8000/cart').then((res) =>
        res.json(),
      ),
  });

  if(isPending){
    return "Loading cart..."
  }else if(error){
    return "Error loading cart: " + error
  }

  const subtotal = data.reduce(
    (total: number, item: ICartItem) => total + item.price * item.quantity,
    0,
  );
  const tax = Number((subtotal * 0.07).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <Card className="sticky top-0 w-full h-[225px]">
      <CardHeader>
        <CardTitle className="pt-4">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-full flex justify-between">
          <h3>Subtotal:</h3>
          <h3>${subtotal}</h3>
        </div>
        <div className="w-full flex justify-between">
          <h3>Tax:</h3>
          <h3>${tax}</h3>
        </div>
        <div className="w-full flex justify-between">
          <h3>Total:</h3>
          <h3>${total}</h3>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Checkout</Button>
      </CardFooter>
    </Card>
  );
});

export default OrderSummary;
