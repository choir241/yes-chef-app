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
import { FaRegTrashAlt } from "react-icons/fa";
import { Textarea } from "../ui/textarea";
import { useEditCart } from "@/hooks/cart/editCartItem";
import { useDeleteCartItem } from "@/hooks/cart/deleteCartItem";

const CartItem = memo(({ item }: { item: ICartItem }) => {
  const [isInstructionsVisible, setIsInstructionsVisible] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const [localInstructions, setLocalInstructions] = useState(item.instructions);

  const updateCartItem = useEditCart();
  const deleteCartItem = useDeleteCartItem();

  const handleQuantityChange = (newQuantity: number) => {
    setLocalQuantity(newQuantity);
    updateCartItem.mutate({
      id: item._id,
      newCartItem: { ...item, quantity: newQuantity },
    });
  };

  function renderInstructions() {
    if (localInstructions) {
      return (
        <Textarea
          value={localInstructions}
          onChange={(e) => {
            updateCartItem.mutate({
              id: item._id,
              newCartItem: { ...item, instructions: e.target.value },
            });
            setLocalInstructions(e.target.value);
          }}
          placeholder="Special instructions (e.g. gluten-free, preferences)"
          rows={8}
          cols={20}
          className="resize-none mt-2 bg-[#f6f4ee]"
        />
      );
    }
    else if (!isInstructionsVisible) {
      return (
        <span
          className="hover:underline cursor-pointer"
          onClick={() => setIsInstructionsVisible(true)}
        >
          Add instructions
        </span>
      );
    } else {
      return (
        <>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => setIsInstructionsVisible(false)}
          >
            Hide instructions
          </span>
          <Textarea
            value={localInstructions}
            onChange={(e) => {
              updateCartItem.mutate({
                id: item._id,
                newCartItem: { ...item, instructions: e.target.value },
              });
              setLocalInstructions(e.target.value);
            }}
            placeholder="Special instructions (e.g. gluten-free, preferences)"
            rows={8}
            cols={20}
            className="resize-none mt-2 bg-[#f6f4ee]"
          />
        </>
      );
    }
  }

  return (
    <Card className="overflow-hidden relative mb-4">
      <CardHeader className="flex items-center justify-between pt-4">
        <CardTitle className="font-semibold text-lg">{item.name}</CardTitle>
        <FaRegTrashAlt
        className="cursor-pointer hover:opacity-40"
        onClick={() => deleteCartItem.mutate({ id: item._id })} />
      </CardHeader>
      <CardContent className="flex justify-between items-start">
        <section className="flex gap-2">
          <>
            <Button
              className="h-8 w-8"
              variant="outline"
              onClick={() => handleQuantityChange(localQuantity - 1)}
            >
              {"-"}
            </Button>
            <span className="flex items-end w-16 h-8 bg-[#f6f4ee] rounded-md border px-3 py-1 text-base shadow-xs md:text-sm">
              {localQuantity}
            </span>
            <Button
              className="h-8 w-8"
              variant="outline"
              onClick={() => handleQuantityChange(localQuantity + 1)}
            >
              {"+"}
            </Button>
          </>
        </section>
        <div className="flex flex-col items-end">
          <span className="font-bold">{`$${item.price * localQuantity}`}</span>
          <span className="text-sm text-muted-foreground">{`$${item.price} each`}</span>
        </div>
      </CardContent>
      <CardFooter className="mb-6 flex flex-col items-start">
        {renderInstructions()}
      </CardFooter>
    </Card>
  );
});

export default CartItem;
