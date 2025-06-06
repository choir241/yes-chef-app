import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import type { IMenuItem } from "./MenuInterfaces";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { labels } from "../../static/labels";
import { memo } from "react";
import { addToCart } from "@/hooks/cart/addToCart";
import { useQuery } from "@tanstack/react-query";

const MenuItem = memo(({ item }: { item: IMenuItem }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_SERVER_URL}/cart`).then((res) =>
        res.json(),
      ),
  });

  if (isPending) {
    console.log("Loading...");
  }
  if (error) {
    console.log(`Error + ${error}`);
  }

  return (
    <Card className="overflow-hidden relative">
      <img src={item.image} className="object-cover h-52 w-full" />
      <Badge className="absolute top-2 right-2">{item.category}</Badge>
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="font-semibold text-lg">{item.name}</CardTitle>
          <span className="font-bold">{`$${item.price}`}</span>
        </div>
        <p className={item.description.length > 50 ? "text-sm text-muted-foreground min-h-10" : "w-[500px] text-sm text-muted-foreground min-h-10"}>
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="pb-4 flex justify-end">
        <Button
          onClick={() =>
            addToCart({ newCartItem: { ...item, quantity: 1 }, data })
          }
        >
          {labels.menu.addToOrder}
        </Button>
      </CardFooter>
    </Card>
  );
});

export default MenuItem;
