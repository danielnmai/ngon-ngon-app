import { Group } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { ChangeEvent } from "react";
import type { CartItemType } from "../contexts/CartContext";

type ItemQuantityInputProps = {
	quantity: number;
	form?: UseFormReturnType<CartItemType>;
	onIncrementQuantity: () => void;
	onDecrementQuantity: () => void;
	onChangeQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
	onInputBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ItemQuantityInput = ({
	quantity,
	form,
	onIncrementQuantity,
	onDecrementQuantity,
	onChangeQuantity,
	onInputBlur,
}: ItemQuantityInputProps) => {
	return (
		<Group className="max-w-[200px] select-none flex-nowrap border-primary rounded-md border-solid border-1">
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
				className="w-12 p-2 text-center focus: outline-none"
				aria-label="order quantity input"
				key={form?.key("quantity")}
				maxLength={3}
				{...form?.getInputProps("quantity")}
				onChange={onChangeQuantity}
				onBlur={onInputBlur}
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
