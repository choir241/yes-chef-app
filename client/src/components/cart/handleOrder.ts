import type { ICartItem } from "../cart/CartInterfaces";
import axios from "axios";
import { deleteCartItem } from "../../hooks/cart/deleteCartItem";
import { toast } from "react-toastify";

interface IOrder extends ICartItem{
    status: string;
}

export async function handleOrder({cart}: {cart: IOrder[]}){
    try {
        const ticket = cart.map((item: IOrder) => {
            return {...item, status: "pending"};
        });

        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/addTicket`,
            {items: ticket, status: "pending"},
        );

        cart.map((item: IOrder) => {
            deleteCartItem({id: item._id});
        });

        toast.success("Order submitted successfully");
        
        return response.data;
    } catch (err) {
        throw new Error(`Error submitting order: ${err}`);
    }
}