import axios from "axios";

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
      "http://localhost:8000/addToCart",
      newCartItem,
    );
    return response.data;
  } catch (err) {
    throw new Error(`Error adding item to cart: ${err}`);
  }
}
