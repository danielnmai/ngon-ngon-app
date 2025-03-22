import { Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ChangeEvent } from "react";
import { CartItem } from "../contexts/CartContext";

type ItemQuantityInputProps = {
  quantity: number;
  form: UseFormReturnType<CartItem>;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
  onChangeQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ItemQuantityInput = ({
  quantity,
  form,
  onIncrementQuantity,
  onDecrementQuantity,
  onChangeQuantity,
}: ItemQuantityInputProps) => {
  return (
    <Group className="max-w-[200px] select-none flex-nowrap ">
      <div
        onClick={onDecrementQuantity}
        className="cursor-pointer p-2 hover:bg-gray-100 hover:rounded-md"
      >
        <MinusIcon width={30} height={30} />
      </div>
      <input
        type="text"
        inputMode="numeric"
        value={quantity}
        className="w-12 p-2 text-center focus:outline-none focus:border-primary focus:rounded-md focus:border-solid focus:border-1 "
        aria-label="order quantity input"
        key={form.key("quantity")}
        maxLength={3}
        {...form.getInputProps("quantity")}
        onChange={onChangeQuantity}
      />

      <div
        onClick={onIncrementQuantity}
        className="cursor-pointer p-2 hover:bg-gray-100 hover:rounded-md"
      >
        <PlusIcon cursor="pointer" width={30} height={30} />
      </div>
    </Group>
  );
};

export default ItemQuantityInput;
