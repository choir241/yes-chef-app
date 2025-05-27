import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "../ui/card";
import { memo, useState } from "react";
import type { ICartItem } from "./CartInterfaces";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea } from "../ui/textarea";

const CartItem = memo(({ item }: { item: ICartItem }) => {
  const [isSpecialInstructionsVisible, setIsSpecialInstructionsVisible] =
    useState(false);

  return (
    <Card className="overflow-hidden relative mb-4">
      <CardHeader className="flex items-center justify-between pt-4">
        <CardTitle className="font-semibold text-lg">{item.name}</CardTitle>
        <FaRegTrashAlt />
      </CardHeader>
      <CardContent className="flex justify-between items-start">
        <section className="flex gap-2">
          <Button className="h-8 w-8" variant="outline">
            {"-"}
          </Button>
          <Input
            type="number"
            defaultValue={item.quantity}
            className="w-16 h-8 bg-[#f6f4ee]"
          />
          <Button className="h-8 w-8" variant="outline">
            {"+"}
          </Button>
        </section>

        <div className="flex flex-col items-end">
          <span className="font-bold">{`$${item.price * item.quantity}`}</span>
          <span className="text-sm text-muted-foreground">{`$${item.price} each`}</span>
        </div>
      </CardContent>
      <CardFooter className="mb-6 flex flex-col items-start">
        {isSpecialInstructionsVisible ? (
          <span
            className="hover:underline cursor-pointer"
            onClick={() => setIsSpecialInstructionsVisible(false)}
          >
            Hide special instructions
          </span>
        ) : (
          <span
            className="hover:underline cursor-pointer"
            onClick={() => setIsSpecialInstructionsVisible(true)}
          >
            Add special instructions
          </span>
        )}
        {isSpecialInstructionsVisible && (
          <Textarea
            placeholder="Special instructions (e.g. gluten-free, preferences)"
            rows={8}
            cols={20}
            className="resize-none mt-2 bg-[#f6f4ee]"
          />
        )}
      </CardFooter>
    </Card>
  );
});

export default CartItem;
