import { type ITicket } from "./TicketInterfaces";

export function updateTicketStatus({status, tickets, currentTicket, setTickets}: {status: string, tickets: ITicket[], currentTicket: ITicket, setTickets: (tickets: ITicket[]) => void}){
    const updatedTickets = tickets.map((ticket) => {
        if (ticket._id === currentTicket._id) {
          return { ...ticket, status: status };
        }
        return ticket;
      });
      setTickets(updatedTickets);
}