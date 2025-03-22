import { Group, Image, Stack } from "@mantine/core";
import { Trash2 } from "lucide-react";
import tempImg from "../assets/pictures/bun-dau-mam-tom.jpg";
import { CartItemType } from "../contexts/CartContext";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  return (
    <Group p={4} className="h-28 w-full justify-between" align="center">
      <Image src={tempImg} w={100} h={100} radius="sm" />
      <Group className="h-full justify-start bg-red-400">
        <Stack className="h-full w-full">
          <div>{item.name}</div>
          <div>{item.optionPrice}</div>
        </Stack>
      </Group>
      <Trash2 className="self-start bg-yellow-300" />
    </Group>
  );
};

export default CartItem;
