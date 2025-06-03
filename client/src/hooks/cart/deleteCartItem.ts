import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/deleteCart/${id}`,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoData"] });
    },
  });
}

export async function deleteCartItem({ id }: { id: string }) {
  const response = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/deleteCart/${id}`,
  );
  return response;
}
