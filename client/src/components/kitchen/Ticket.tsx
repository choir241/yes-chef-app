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
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function ItemTicket({ ticket }: { ticket: ITicket }) {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div className="pt-4">
                    <CardTitle>Ticket #{ticket.ticketNum}</CardTitle>
                    <span>Ordered at {new Date(ticket.orderTime).toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"})}</span>
                </div>
                <Badge variant={ticket.status === "in progress" ? "default" : "destructive"}><CiTimer />{ticket.status}</Badge>
            </CardHeader>
            <CardContent>
                {ticket.items.map((item) => (
                    <div key={item._id} className="p-2 flex items-center justify-between">
                        {item.status === "completed" ? <IoMdCheckmarkCircleOutline className="text-green-500" /> : <IoMdCheckmarkCircleOutline />}
                        <section className="flex flex-col">
                            <span>{item.name}</span>
                            <span className="text-xs text-muted-foreground">{item.instructions}</span>
                        </section>
                        <p>x{item.quantity}</p>

                    </div>
                ))}
            </CardContent>
            <CardFooter>
                
            </CardFooter>
        </Card>
    )
}