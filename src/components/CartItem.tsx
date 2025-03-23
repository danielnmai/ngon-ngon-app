import { Group, Image, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import tempImg from "../assets/pictures/bun-dau-mam-tom.jpg";
import { CartContext, CartItemType } from "../contexts/CartContext";
import { centsToDollar } from "../utils";
import ItemQuantityInput from "./ItemQuantityInput";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { ref, width } = useElementSize();
  const { addItem, removeItem, incrementItemQty, decrementItemQty } =
    useContext(CartContext);

  const isWideScreen = width >= 768;

  const handleIncrementQuantity = () => {
    incrementItemQty(item);
  };

  const handleDecrementQuantity = () => {
    decrementItemQty(item);
  };

  const handleChangeQuantity = () => {
    addItem(item);
  };

  const handleRemoveItem = () => {
    removeItem(item);
  };

  return (
    <Group className="p-2 h-fit w-full flex-nowrap justify-between">
      <Image src={tempImg} w={120} h={120} radius="sm" />
      <Group
        ref={ref}
        className={`w-full items-start
          ${isWideScreen && "flex-nowrap"}`}
      >
        <Stack className="w-full">
          <Text>{item.name}</Text>
          <Text>{centsToDollar(item.optionPrice)}</Text>
        </Stack>
        <Group className="w-full justify-between">
          <ItemQuantityInput
            quantity={item.quantity}
            onIncrementQuantity={handleIncrementQuantity}
            onDecrementQuantity={handleDecrementQuantity}
            onChangeQuantity={handleChangeQuantity}
          />
          <Text>{centsToDollar(item.totalPrice)}</Text>
        </Group>
      </Group>

      <Trash2
        className="self-start cursor-pointer"
        size={40}
        onClick={handleRemoveItem}
      />
    </Group>
  );
};

export default CartItem;
