import {
  Button,
  Container,
  Group,
  Image,
  Modal,
  Radio,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ChangeEvent, useContext, useState } from "react";
import { CartContext, CartItemType } from "../contexts/CartContext";
import { Food, FoodOption } from "../schemas/menu";
import { centsToDollar } from "../utils";
import { Size } from "../utils/constants";
import ItemQuantityInput from "./ItemQuantityInput";

type ModalProps = {
  food: Food;
  opened: boolean;
  onClose: () => void;
};

const OrderModal = ({ food, opened, onClose }: ModalProps) => {
  const [quantity, setQuantity] = useState<number>(food.options[0].minQuantity);
  const [totalPrice, setTotalPrice] = useState<number>(
    food.options[0].price * quantity
  );
  const [selectedOption, setSelectedOption] = useState<FoodOption>(
    food.options[0]
  );
  const { addItem } = useContext(CartContext);

  const form = useForm<CartItemType>({
    initialValues: {
      quantity: selectedOption.minQuantity,
      size: Size.medium,
      foodId: food.id,
      specialRequest: "",
      totalPrice: selectedOption.price * selectedOption.minQuantity,
      name: food.name,
      optionPrice: selectedOption.price,
      optionQuantity: selectedOption.minQuantity,
    },
  });

  const handleIncrementQuantity = () => {
    const newQuantity = quantity + 1;
    const newTotalPrice = totalPrice + selectedOption.price;

    setQuantity(newQuantity);
    form.setFieldValue("quantity", newQuantity);
    setTotalPrice(newTotalPrice);
    form.setFieldValue("totalPrice", newTotalPrice);
  };

  const handleDecrementQuantity = () => {
    if (quantity == selectedOption.minQuantity) {
      return;
    }
    const newQuantity = quantity - 1;
    const newTotalPrice = totalPrice - selectedOption.price;

    setQuantity(newQuantity);
    form.setFieldValue("quantity", newQuantity);
    setTotalPrice(newTotalPrice);
    form.setFieldValue("totalPrice", newTotalPrice);
  };

  const handleSubmit = (values: CartItemType) => {
    addItem(values);
    onClose();
  };

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    // default to min quantity if input is empty
    if (!e.target.value) {
      setQuantity(selectedOption.minQuantity);
      form.setFieldValue("quantity", selectedOption.minQuantity);
      return;
    }

    const quantity = parseInt(e.target.value);
    setQuantity(quantity);
    form.setFieldValue("quantity", quantity);

    const newTotalPrice = quantity * selectedOption.price;
    setTotalPrice(newTotalPrice);
    form.setFieldValue("totalPrice", newTotalPrice);
  };

  const onFoodSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const foodSize = e.target.value;
    const foodOption = food.options.find((option) => option.size === foodSize);

    if (foodOption) {
      setSelectedOption(foodOption);
      setTotalPrice(foodOption.price * quantity);
      form.setFieldValue("totalPrice", foodOption.price * quantity);
      form.setFieldValue("optionPrice", foodOption.price);
    }
  };

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      return;
    }
    const quantity = parseInt(e.target.value);

    if (quantity < selectedOption.minQuantity) {
      const newQuantity = selectedOption.minQuantity;
      const newTotalPrice = selectedOption.price * selectedOption.minQuantity;

      setQuantity(newQuantity);
      setTotalPrice(newTotalPrice);

      form.setFieldValue("quantity", newQuantity);
      form.setFieldValue("totalPrice", newTotalPrice);
    }
  };

  const renderFoodSizeOption = (option: FoodOption) => {
    return (
      <Radio
        key={option.id}
        value={option.size}
        label={
          <Group>
            <Text>{option.size}</Text>
            <Text size="sm" className="text-gray-500">
              {centsToDollar(option.price)}
            </Text>
          </Group>
        }
        onChange={onFoodSizeChange}
        my={8}
        color="var(--color-primary)"
        classNames={{
          label: "ml-2",
        }}
      />
    );
  };

  return (
    <Modal opened={opened} onClose={onClose} centered size="lg">
      <Container my={8}>
        <Stack>
          <Title order={3}>{food.name}</Title>
          <Text>{food.description}</Text>
          <Image src="src/assets/pictures/bun-dau-mam-tom.jpg" />
        </Stack>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Radio.Group
            label="Size"
            {...form.getInputProps("size")}
            key={form.key("size")}
            my={10}
          >
            {food.options.map(renderFoodSizeOption)}
          </Radio.Group>

          <Textarea
            label="Special Request"
            placeholder="More salty? Extra sauce? We'll try our best to accomodate."
            className="my-4"
            key={form.key("specialRequest")}
            {...form.getInputProps("specialRequest")}
            classNames={{
              label: "mb-2",
              input: "focus:border-primary",
            }}
          />

          <Group w="100%" className="justify-between flex-nowrap">
            <ItemQuantityInput
              form={form}
              quantity={quantity}
              onIncrementQuantity={handleIncrementQuantity}
              onDecrementQuantity={handleDecrementQuantity}
              onChangeQuantity={handleChangeQuantity}
              onInputBlur={handleInputBlur}
            />

            <Button size="md" className="bg-primary" type="submit">
              Add to Cart - {centsToDollar(totalPrice)}
            </Button>
          </Group>
        </form>
      </Container>
    </Modal>
  );
};

export default OrderModal;
