import type { ICartItem } from "../cart/CartInterfaces";

export interface ICartTicket extends ICartItem {
  status: string;
}

export interface ITicket {
  _id: string;
  ticketNum: number;
  items: ICartTicket[];
  status: string;
  createdAt: string;
}
