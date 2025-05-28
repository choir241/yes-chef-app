import type { ICartItem } from "@/components/cart/CartInterfaces";
import axios from "axios";

export async function addToCart({newCartItem}:{newCartItem: ICartItem}){
    try{
        const response = await axios.post("http://localhost:8000/addToCart", newCartItem);
        return response.data;
    }catch(err){
        throw new Error(`Error adding item to cart: ${err}`);
    }
}