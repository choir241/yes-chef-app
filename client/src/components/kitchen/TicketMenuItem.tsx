import { type ICartTicket} from "./TicketInterfaces";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { memo } from "react";

const TicketMenuItem = memo(function TicketMenuItem({item, handleTicketItemStatus, status}: {item: ICartTicket, handleTicketItemStatus: ({
    updatedItem,
  }: {
    updatedItem: ICartTicket;
  }) => void, status: string}){
    return (
        <div
        onClick={() => {
          status === "pending" ? 
          ""
          : 
          handleTicketItemStatus({updatedItem: item});
        }}
        key={item._id}
        className={
            status === "pending" ? "my-2 p-2 flex items-center justify-between" : 
          item.status === "completed"
            ? "bg-[#f0f2f4] rounded my-2 p-2 flex items-center justify-between"
            : "hover:bg-[#f0f2f4] cursor-pointer my-2 p-2 flex items-center justify-between"
        }
      >
        <section className="flex items-center gap-2">
          {
          item.status === "pending" ?
          <IoMdCheckmarkCircleOutline size={24} />
          :
          item.status === "completed" ? (
            <IoMdCheckmarkCircleOutline
              className="text-green-500"
              size={24}
            />
          ) : (
            <IoMdCheckmarkCircleOutline size={24} />
          )}
          <div className="flex items-start flex-col px-2">
            <span
              className={
                item.status === "completed" ? "line-through" : ""
              }
            >
              {item.name}
            </span>
            <span
              className={`text-xs text-muted-foreground ${item.status === "completed" ? "line-through" : ""}`}
            >
              {item.instructions}
            </span>
          </div>
        </section>
        <p>x{item.quantity}</p>
      </div>
    
    )
});

export default TicketMenuItem;