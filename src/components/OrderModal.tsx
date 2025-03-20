import {
  Button,
  Container,
  Group,
  Image,
  Modal,
  NumberFormatter,
  Radio,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ChangeEvent, useContext, useState } from "react";
import { CartContext, CartItem } from "../contexts/CartContext";
import { Food, FoodOption } from "../schemas/menu";
import { Size } from "../utils/constants";

type ModalProps = {
  food: Food;
  opened: boolean;
  onClose: () => void;
};

const OrderModal = ({ food, opened, onClose }: ModalProps) => {
  const [quantity, setQuantity] = useState<number>(food.options[0].minQuantity);
  const [totalPrice, setTotalPrice] = useState<number>(food.options[0].price);
  const [selectedOption, setSelectedOption] = useState<FoodOption>(
    food.options[0]
  );
  const { addItem } = useContext(CartContext);

  const form = useForm<CartItem>({
    initialValues: {
      quantity: food.options[0].minQuantity,
      size: Size.medium,
      foodId: food.id,
      specialRequest: "",
      totalPrice: food.options[0].price,
    },
  });

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    const newTotalPrice = totalPrice + selectedOption.price;

    setQuantity(newQuantity);
    form.setFieldValue("quantity", newQuantity);
    setTotalPrice(newTotalPrice);
    form.setFieldValue("totalPrice", newTotalPrice);
  };

  const decrementQuantity = () => {
    if (quantity == food.options[0].minQuantity) {
      return;
    }
    const newQuantity = quantity - 1;
    const newTotalPrice = totalPrice - selectedOption.price;

    setQuantity(newQuantity);
    form.setFieldValue("quantity", newQuantity);
    setTotalPrice(newTotalPrice);
    form.setFieldValue("totalPrice", newTotalPrice);
  };

  const handleSubmit = (values: CartItem) => {
    addItem(values);
    onClose();
  };

  const onFoodSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const foodSize = e.target.value;
    const foodOption = food.options.find((option) => option.size === foodSize);

    if (foodOption) {
      setSelectedOption(foodOption);
      setTotalPrice(foodOption.price * quantity);
      form.setFieldValue("totalPrice", foodOption.price * quantity);
    }
  };

  const onFoodQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    // default to min quantity if input is empty
    if (!e.target.value) {
      setQuantity(food.options[0].minQuantity);
      form.setFieldValue("quantity", food.options[0].minQuantity);
      return;
    }

    const quantity = parseInt(e.target.value);
    setQuantity(quantity);
    form.setFieldValue("quantity", quantity);

    const newTotalPrice = quantity * selectedOption.price;
    setTotalPrice(newTotalPrice);
    form.setFieldValue("totalPrice", newTotalPrice);
  };

  const renderFoodSizeOption = (option: FoodOption) => {
    return (
      <Radio
        key={option.id}
        value={option.size}
        label={
          <Group>
            <Text>{option.size}</Text>
            <NumberFormatter
              value={option.price / 100}
              prefix="$"
              thousandSeparator
              fixedDecimalScale
              decimalScale={2}
              className="text-gray-500"
            />
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
            <Group className="max-w-[200px] select-none flex-nowrap ">
              <div
                onClick={decrementQuantity}
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
                onChange={onFoodQuantityChange}
              />

              <div
                onClick={incrementQuantity}
                className="cursor-pointer p-2 hover:bg-gray-100 hover:rounded-md"
              >
                <PlusIcon cursor="pointer" width={30} height={30} />
              </div>
            </Group>

            <Button size="md" className="bg-primary" type="submit">
              Add to Cart -
              <NumberFormatter
                prefix=" $"
                value={totalPrice / 100}
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
              />
            </Button>
          </Group>
        </form>
      </Container>
    </Modal>
  );
};

export default OrderModal;
