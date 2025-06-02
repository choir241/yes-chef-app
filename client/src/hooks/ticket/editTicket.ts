import type { ITicket } from "@/components/kitchen/TicketInterfaces";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      newTicket,
    }: {
      id: string;
      newTicket: ITicket;
    }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/updateTicket/${id}`,
        newTicket,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoData"] });
    },
  });
}
