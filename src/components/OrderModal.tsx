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
import { ChangeEvent, useState } from "react";
import { Food, FoodOption } from "../schemas/menu";

type ModalProps = {
  food: Food;
  opened: boolean;
  onClose: () => void;
};

enum Size {
  small = "SMALL",
  medium = "MEDIUM",
  large = "LARGE",
}

type FormValues = {
  quantity: number;
  size: Size;
  foodId: number;
  specialRequest?: string;
  totalPrice: number;
};

const OrderModal = ({ food, opened, onClose }: ModalProps) => {
  const [quantity, setQuantity] = useState<number>(food.options[0].minQuantity);
  const [totalPrice, setTotalPrice] = useState<number>(food.options[0].price);
  const [selectedOption, setSelectedOption] = useState<FoodOption>(
    food.options[0]
  );

  const form = useForm<FormValues>({
    initialValues: {
      quantity: food.options[0].minQuantity,
      size: Size.medium,
      foodId: food.id,
      specialRequest: "",
      totalPrice: food.options[0].price,
    },
  });

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    form.setFieldValue("quantity", quantity + 1);
    setTotalPrice(totalPrice + selectedOption.price);
    form.setFieldValue("totalPrice", totalPrice + selectedOption.price);
  };

  const decrementQuantity = () => {
    if (quantity == food.options[0].minQuantity) {
      return;
    }
    setQuantity(quantity - 1);
    form.setFieldValue("quantity", quantity - 1);
    setTotalPrice(totalPrice - selectedOption!.price);
    form.setFieldValue("totalPrice", totalPrice - selectedOption.price);
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  const onRadioOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const option = food.options.find((option) => option.size === value);

    if (option) {
      setSelectedOption(option);
      setTotalPrice(option.price * quantity);
      form.setFieldValue("totalPrice", option.price * quantity);
    }
  };

  const renderFoodOption = (option: FoodOption) => {
    return (
      <Radio
        key={option.id}
        value={option.size}
        label={option.size}
        onChange={onRadioOptionChange}
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
            {food.options.map(renderFoodOption)}
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
                onChange={(e) => {
                  if (!e.target.value) {
                    setQuantity(food.options[0].minQuantity);
                    form.setFieldValue("quantity", food.options[0].minQuantity);
                    return;
                  }
                  const quantity = parseInt(e.target.value);
                  setQuantity(quantity);
                  form.setFieldValue("quantity", quantity);
                  setTotalPrice(quantity * selectedOption.price);
                  form.setFieldValue(
                    "totalPrice",
                    quantity * selectedOption.price
                  );
                }}
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
