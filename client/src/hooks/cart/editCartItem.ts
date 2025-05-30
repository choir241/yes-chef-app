import type { ICartItem } from "@/components/cart/CartInterfaces";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      newCartItem,
    }: {
      id: string;
      newCartItem: ICartItem;
    }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/updateCart/${id}`,
        newCartItem,
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoData"] });
    },
  });
}
