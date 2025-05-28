import { useQuery } from "@tanstack/react-query";

export function useCartData() {
  return useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:8000/cart").then((res) => res.json()),
  });
}
