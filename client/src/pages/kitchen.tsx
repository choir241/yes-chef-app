import ItemTicket from "../components/kitchen/Ticket";
import { useQuery } from "@tanstack/react-query";
import { type ITicket } from "../components/kitchen/TicketInterfaces";
import { useEffect, memo, useState } from "react";
import { labels } from "../static/labels";

const Kitchen = memo(() => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`).then((res) =>
        res.json(),
      ),
  });

  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    if (isPending) {
      console.log(labels.OrderSummary.loading);
    } else if (error) {
      console.log(labels.OrderSummary.error + error);
    } else {
      setTickets(data);
    }
  }, [isPending, error, data]);

  return (
    <>
      <section className="w-full p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket: ITicket) => {
          if (ticket.status !== "completed") {
            return (
              <ItemTicket
                key={ticket._id}
                ticket={ticket}
                tickets={tickets}
                setTickets={setTickets}
              />
            );
          }
        })}
      </section>
    </>
  );
});

export default Kitchen;
