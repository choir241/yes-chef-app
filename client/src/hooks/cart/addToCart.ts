import axios from "axios";
import { toast } from "react-toastify";
import type { ICartItem } from "../cart/CartInterfaces";
interface IAddToCartProps {
  name: string;
  price: number;
  quantity: number;
  instructions?: string;
}

export async function addToCart({
  newCartItem,
  data,
}: {
  newCartItem: IAddToCartProps;
  data: ICartItem[];
}) {
  try {
    const findItem = data.find((item: ICartItem) => {
      if (item.name === newCartItem.name) {
        return item;
      }
    });
    if (findItem) {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/updateCart/${findItem._id}`,
        { ...findItem, quantity: findItem.quantity + 1 },
      );
      toast.success("Item quantity updated");
      return response.data;
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/addToCart`,
        newCartItem,
      );
      toast.success("Item added to cart");
      return response.data;
    }
  } catch (err) {
    throw new Error(`Error adding item to cart: ${err}`);
  }
}
