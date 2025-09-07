import { Group, Image, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { Trash2 } from "lucide-react";
import { type ChangeEvent, useContext } from "react";
import { CartContext, type CartItemType } from "../contexts/CartContext";
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

	const handleIncrementQuantity = () => incrementItemQty(item);

	const handleDecrementQuantity = () => decrementItemQty(item);

	const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			addItem({ ...item, quantity: item.optionQuantity });
			return;
		}
		const quantity = parseInt(e.target.value, 10);

		addItem({ ...item, quantity });
	};

	const handleRemoveItem = () => {
		removeItem(item);
	};

	const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) {
			return;
		}

		const quantity = parseInt(e.target.value, 10);

		if (quantity < item.optionQuantity) {
			addItem({ ...item, quantity: item.optionQuantity });
		}
	};

	return (
		<Group className="h-fit w-full flex-nowrap justify-between my-2">
			<Image src={item.photo} w={120} h={120} radius="sm" />
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
						onInputBlur={handleInputBlur}
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
