import { Group, Image, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { Trash2 } from "lucide-react";
import tempImg from "../assets/pictures/bun-dau-mam-tom.jpg";
import { CartItemType } from "../contexts/CartContext";
import { centsToDollar } from "../utils";
import ItemQuantityInput from "./ItemQuantityInput";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { ref, width } = useElementSize();
  const isWideScreen = width >= 768;

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
          <ItemQuantityInput quantity={item.quantity} />
          <Text>{centsToDollar(item.totalPrice)}</Text>
        </Group>
      </Group>

      <Trash2 className="self-start" size={40} />
    </Group>
  );
};

export default CartItem;
