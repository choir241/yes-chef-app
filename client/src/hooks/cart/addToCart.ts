import axios from "axios";
import { toast } from "react-toastify";
interface IAddToCartProps {
  name: string;
  price: number;
  quantity: number;
  instructions?: string;
}

export async function addToCart({
  newCartItem,
}: {
  newCartItem: IAddToCartProps;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/addToCart`,
      newCartItem,
    );
    toast.success("Item added to cart");
    return response.data;
  } catch (err) {
    throw new Error(`Error adding item to cart: ${err}`);
  }
}
