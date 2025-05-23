import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import type { IMenuItem } from "./MenuInterfaces";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {labels} from "@/static/labels";

export default function Item({item}: {item: IMenuItem}) { 
  return (
    <Card className="overflow-hidden relative">
        <img src={item.image} className="object-cover h-52 w-full"/>
        <Badge className="absolute top-2 right-2">{item.category}</Badge>
    <CardContent>
        <div className="flex justify-between items-start mb-2">
        <CardTitle className="font-semibold text-lg">{item.name}</CardTitle>
        <span className="font-bold">{`$${item.price}`}</span>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        </CardContent>
        <CardFooter className="pb-4 flex justify-end">
            <Button>{labels.menu.addToOrder}</Button>
        </CardFooter>
      </Card>
  );
}
