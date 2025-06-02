import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "../ui/card";
import type { ITicket } from "./TicketInterfaces";
import { Badge } from "../ui/badge";
import { CiTimer } from "react-icons/ci";
import type { ICartTicket } from "./TicketInterfaces";
import { Button } from "../ui/button";
import { updateTicketStatus } from "./updateTickets";
import TicketMenuItem from "./TicketMenuItem";
import { memo } from "react";

const ItemTicket = memo(({
  ticket,
  tickets,
  setTickets,
}: {
  ticket: ITicket;
  tickets: ITicket[];
  setTickets: (e: ITicket[]) => void;
}) => {
  function handleTicketItemStatus({
    updatedItem,
  }: {
    updatedItem: ICartTicket;
  }) {
    const updatedTicketItems = ticket.items.map((item) => {
      if (
        item._id === updatedItem._id &&
        updatedItem.status === "in progress"
      ) {
        return { ...item, status: "completed" };
      }
      return item;
    });
    const updatedTickets = tickets.map((currentTicket) => {
      if (currentTicket._id === ticket._id) {
        return { ...currentTicket, items: updatedTicketItems };
      }
      return currentTicket;
    });
    setTickets(updatedTickets);
  }

  function handleTicketStatus(currentTicket: ITicket) {
    if (currentTicket.status === "pending") {
        updateTicketStatus({status: "in progress", tickets, currentTicket, setTickets});
    } else if (currentTicket.status === "in progress") {
        updateTicketStatus({status: "completed", tickets, currentTicket, setTickets});
    }
  }

  function ticketStatus() {
    if (ticket.status === "pending") {
      return (
        <Button
          variant="outline"
          onClick={() => {
            handleTicketStatus(ticket);
          }}
          className="w-full"
        >
          Start Ticket
        </Button>
      );
    } else if (ticket.status === "in progress") {
      if (ticket.items.every((item) => item.status === "completed")) {
        return (
          <Button
            variant="default"
            onClick={() => {
              handleTicketStatus(ticket);
            }}
            className="w-full"
          >
            Complete Ticket
          </Button>
        );
      } else {
        return (
          <Button variant="default" disabled={true} className="w-full">
            Complete Ticket
          </Button>
        );
      }
    }
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="pt-4">
          <CardTitle>Ticket #{ticket.ticketNum}</CardTitle>
          <span>
            Ordered at{" "}
            {new Date(ticket.createdAt).toLocaleTimeString(navigator.language, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <Badge
          variant={ticket.status === "in progress" ? "default" : "outline"}
        >
          <CiTimer />
          {ticket.status}
        </Badge>
      </CardHeader>
      <CardContent>
        {ticket.items.map((item) => {
            return <TicketMenuItem key ={item._id} status = {ticket.status} item={item} handleTicketItemStatus={handleTicketItemStatus} />;
        })}
      </CardContent>
      <CardFooter className="mb-4">{ticketStatus()}</CardFooter>
    </Card>
  );
});

export default ItemTicket;

