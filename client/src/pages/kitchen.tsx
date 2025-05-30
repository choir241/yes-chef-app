import ItemTicket from "../components/kitchen/Ticket";
import { useState } from "react";
import { type ITicket } from "../components/kitchen/TicketInterfaces";

export const mockTickets: ITicket[] = [
  {
    _id: "1",
    ticketNum: 1,
    items: [
      {
        name: "Caesar Salad",
        price: 9.99,
        quantity: 12,
        instructions: "No Dressing",
        status: "in progress",
        _id: "1",
      },
      {
        name: "Classic Burger",
        price: 12.99,
        quantity: 2,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "2",
      },
      {
        name: "Margherita Pizza",
        price: 14.99,
        quantity: 1,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "3",
      },
      {
        name: "Garlic Bread",
        price: 6.99,
        quantity: 4,
        instructions: "Extra garlic",
        status: "in progress",
        _id: "4",
      },
      {
        name: "Sparkling Water",
        price: 2.99,
        quantity: 3,
        instructions: "Lemon instead of lime",
        status: "in progress",
        _id: "5",
      },
    ],
    status: "in progress",
    orderTime: new Date().toISOString(),
  },
  {
    _id: "2",
    ticketNum: 2,
    items: [
      {
        name: "Caesar Salad",
        price: 9.99,
        quantity: 12,
        instructions: "No Dressing",
        status: "in progress",
        _id: "1",
      },
      {
        name: "Classic Burger",
        price: 12.99,
        quantity: 2,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "2",
      },
      {
        name: "Margherita Pizza",
        price: 14.99,
        quantity: 1,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "3",
      },
      {
        name: "Garlic Bread",
        price: 6.99,
        quantity: 4,
        instructions: "Extra garlic",
        status: "in progress",
        _id: "4",
      },
      {
        name: "Sparkling Water",
        price: 2.99,
        quantity: 3,
        instructions: "Lemon instead of lime",
        status: "in progress",
        _id: "5",
      },
    ],
    status: "pending",
    orderTime: new Date().toISOString(),
  },
  {
    _id: "3",
    ticketNum: 3,
    items: [
      {
        name: "Caesar Salad",
        price: 9.99,
        quantity: 12,
        instructions: "No Dressing",
        status: "completed",
        _id: "1",
      },
      {
        name: "Classic Burger",
        price: 12.99,
        quantity: 2,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "2",
      },
      {
        name: "Margherita Pizza",
        price: 14.99,
        quantity: 1,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "3",
      },
      {
        name: "Garlic Bread",
        price: 6.99,
        quantity: 4,
        instructions: "Extra garlic",
        status: "in progress",
        _id: "4",
      },
      {
        name: "Sparkling Water",
        price: 2.99,
        quantity: 3,
        instructions: "Lemon instead of lime",
        status: "in progress",
        _id: "5",
      },
    ],
    status: "completed",
    orderTime: new Date().toISOString(),
  },
  {
    _id: "4",
    ticketNum: 4,
    items: [
      {
        name: "Caesar Salad",
        price: 9.99,
        quantity: 12,
        instructions: "No Dressing",
        status: "in progress",
        _id: "1",
      },
      {
        name: "Classic Burger",
        price: 12.99,
        quantity: 2,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "2",
      },
      {
        name: "Margherita Pizza",
        price: 14.99,
        quantity: 1,
        instructions: "Extra cheese",
        status: "in progress",
        _id: "3",
      },
      {
        name: "Garlic Bread",
        price: 6.99,
        quantity: 4,
        instructions: "Extra garlic",
        status: "in progress",
        _id: "4",
      },
      {
        name: "Sparkling Water",
        price: 2.99,
        quantity: 3,
        instructions: "Lemon instead of lime",
        status: "in progress",
        _id: "5",
      },
    ],
    status: "completed",
    orderTime: new Date().toISOString(),
  }
];

export default function Kitchen(){

  const [tickets, setTickets] = useState(mockTickets);

  return(
    <>
    <section className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {tickets.map((ticket) => (
        <ItemTicket key={ticket._id} ticket={ticket} tickets={tickets} setTickets={setTickets} />
    ))}
    </section>
    </>
  )
}