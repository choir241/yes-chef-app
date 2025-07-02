import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { labels } from "@/static/labels";
import { inventory } from "@/static/inventory";
import { type IInventoryItem } from "./InventoryInterfaces";
import { CiCalendar } from "react-icons/ci";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

export default function InventoryTable() {
  const [localQuantity, setLocalQuantity] = useState(0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{labels.inventory.name}</TableHead>
          <TableHead>{labels.inventory.unitPrice}</TableHead>
          <TableHead>{labels.inventory.orderMore}</TableHead>
          <TableHead>{labels.inventory.quantity}</TableHead>
          <TableHead>{labels.inventory.nextOrderDate}</TableHead>
          <TableHead>{labels.inventory.total}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map((item: IInventoryItem) => (
          <TableRow key={item._id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
            <TableCell className="flex items-center gap-2">
              <CiCalendar />
              {item.nextOrderDate}
            </TableCell>
            <TableCell>
                {item.quantity}
            </TableCell>
            <TableCell className="flex items-center gap-2">
            <Input min = {0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalQuantity(Number(e.target.value))} className="flex items-end w-16 h-8 bg-[#f6f4ee] rounded-md border px-3 py-1 text-base shadow-xs md:text-sm"type="number" value={localQuantity} />
              <Button>{labels.inventory.orderMore}</Button>
            </TableCell>
            <TableCell>${(item.unitPrice * Number(localQuantity)).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
