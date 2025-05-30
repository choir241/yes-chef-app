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
import type { ICartTicket } from "./TicketInterfaces";
import { Button } from "../ui/button";

export default function ItemTicket({ ticket, tickets, setTickets }: { ticket: ITicket, tickets: ITicket[], setTickets: (e: ITicket[]) => void }) {

    function handleTicketItemStatus({updatedItem}:{updatedItem: ICartTicket}){
        const updatedTicketItems = ticket.items.map((item) => {
            if(item._id === updatedItem._id && updatedItem.status === "in progress"){
                return {...item, status: "completed"}
            }
            return item;
        })
        const updatedTickets = tickets.map((currentTicket)=>{
            if(currentTicket._id === ticket._id){
                return {...currentTicket, items: updatedTicketItems}
            }
            return currentTicket;
        })
        setTickets(updatedTickets)
    }

    function handleTicketStatus(currentTicket: ITicket){
        if(currentTicket.status === "pending"){
            const updatedTickets = tickets.map((ticket)=>{
                if(ticket._id === currentTicket._id){
                    return {...ticket, status: "in progress"}
                }
                return ticket;
            })
            setTickets(updatedTickets)
        }
        else if(currentTicket.status === "in progress"){
            const updatedTickets = tickets.map((ticket)=>{
                if(ticket._id === currentTicket._id){
                    return {...ticket, status: "completed"}
                }
                return ticket;
            })
            setTickets(updatedTickets)
        }
    }

    function ticketStatus(){
        if(ticket.status === "pending"){
            return (
                <Button variant="outline" onClick={() => {handleTicketStatus(ticket)}} className="w-full">Mark as in progress</Button>
            )
        }
        else if(ticket.status === "in progress"){
            return (
                <Button variant="default" onClick={() => {handleTicketStatus(ticket)}} className="w-full">Mark as completed</Button>
            )
        }
    }

    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <div className="pt-4">
                    <CardTitle>Ticket #{ticket.ticketNum}</CardTitle>
                    <span>Ordered at {new Date(ticket.orderTime).toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit"})}</span>
                </div>
                <Badge variant={ticket.status === "in progress" ? "default" : "outline"}><CiTimer />{ticket.status}</Badge>
            </CardHeader>
            <CardContent>
                {ticket.items.map((item) => (
                    <div 
                    onClick={() => {handleTicketItemStatus({updatedItem: item})}}
                    key={item._id} className={item.status === "completed" ? "bg-[#f0f2f4] rounded my-2 p-2 flex items-center justify-between" : "cursor-pointer my-2 p-2 flex items-center justify-between"}>
                        <section className="flex items-center gap-2">
                        {item.status === "completed" ? <IoMdCheckmarkCircleOutline className="text-green-500" size={24} /> : <IoMdCheckmarkCircleOutline size={24} />}
                            <div className="flex items-start flex-col px-2">
                                <span className={item.status === "completed" ? "line-through" : ""}>{item.name}</span>
                                <span className={`text-xs text-muted-foreground ${item.status === "completed" ? "line-through" : ""}`}>{item.instructions}</span>
                            </div>
                        </section>
                        <p>x{item.quantity}</p>

                    </div>
                ))}
            </CardContent>
            <CardFooter className="mb-4">
                {ticketStatus()}
            </CardFooter>
        </Card>
    )
}