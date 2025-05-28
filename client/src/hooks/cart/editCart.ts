import type { ICartItem } from "@/components/cart/CartInterfaces";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export { useCartData } from "./useCartData";

export function useEditCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newCartItem }: { id: string; newCartItem: ICartItem }) => {
      const response = await axios.patch(
        `http://localhost:8000/updateCart/${id}`,
        newCartItem
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repoData"] });
    },
  });
}
