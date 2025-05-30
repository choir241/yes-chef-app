import { Textarea } from "../ui/textarea";

export function renderInstructions({
  localInstructions,
  updateCartItem,
  item,
  setLocalInstructions,
  isInstructionsVisible,
  setIsInstructionsVisible,
}: {
  localInstructions: string | undefined;
  updateCartItem: any;
  item: any;
  setLocalInstructions: any;
  isInstructionsVisible: boolean;
  setIsInstructionsVisible: any;
}) {
  if (localInstructions) {
    return (
      <Textarea
        value={localInstructions}
        onChange={(e) => {
          updateCartItem.mutate({
            id: item._id,
            newCartItem: { ...item, instructions: e.target.value },
          });
          setLocalInstructions(e.target.value);
        }}
        placeholder="Special instructions (e.g. gluten-free, preferences)"
        rows={8}
        cols={20}
        className="resize-none mt-2 bg-[#f6f4ee]"
      />
    );
  } else if (!isInstructionsVisible) {
    return (
      <span
        className="hover:underline cursor-pointer"
        onClick={() => setIsInstructionsVisible(true)}
      >
        Add instructions
      </span>
    );
  } else {
    return (
      <>
        <span
          className="hover:underline cursor-pointer"
          onClick={() => setIsInstructionsVisible(false)}
        >
          Hide instructions
        </span>
        <Textarea
          value={localInstructions}
          onChange={(e) => {
            updateCartItem.mutate({
              id: item._id,
              newCartItem: { ...item, instructions: e.target.value },
            });
            setLocalInstructions(e.target.value);
          }}
          placeholder="Special instructions (e.g. gluten-free, preferences)"
          rows={8}
          cols={20}
          className="resize-none mt-2 bg-[#f6f4ee]"
        />
      </>
    );
  }
}
