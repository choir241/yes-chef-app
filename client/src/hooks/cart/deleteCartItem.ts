import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await axios.delete(
        `http://localhost:8000/deleteCart/${id}`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoData"] });
    },
  });
}
