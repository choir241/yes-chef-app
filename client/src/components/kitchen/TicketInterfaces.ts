import type { ICartItem } from "../cart/CartInterfaces";

interface ICartTicket extends ICartItem {
    status: string;    
}

export interface ITicket {
    _id: string;
    ticketNum: number;
    items: ICartTicket[];
    status: string;
    orderTime: string;
}
