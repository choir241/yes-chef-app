import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

export const mockCart = [
  {
    name: "Caesar Salad",
    price: 9.99,
    quantity: 12,
    instructions: "No Dressing",
  },
  {
    name: "Classic Burger",
    price: 12.99,
    quantity: 2,
    instructions: "Extra cheese",
  },
  {
    name: "Margherita Pizza",
    price: 14.99,
    quantity: 1,
    instructions: "Extra cheese",
  },
  {
    name: "Garlic Bread",
    price: 6.99,
    quantity: 4,
    instructions: "Extra garlic",
  },
  {
    name: "Sparkling Water",
    price: 2.99,
    quantity: 3,
    instructions: "Lemon instead of lime",
  },
];
export default function OrderSummary() {
  const subtotal = mockCart.reduce(
    (total, item) => total + item.price * item.quantity,
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
}
