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
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Food } from "../schemas/menu";
type ModalProps = {
  food: Food;
  opened: boolean;
  onClose: () => void;
};

enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

type FormValues = {
  quantity: number;
  size: Size;
  foodId: number;
  specialRequest?: string;
};

const OrderModal = ({ food, opened, onClose }: ModalProps) => {
  const form = useForm<FormValues>({
    initialValues: {
      quantity: 1,
      size: Size.small,
      foodId: food.id,
      specialRequest: "",
    },
  });

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    form.setFieldValue("quantity", quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity == 1) {
      return;
    }
    setQuantity(quantity - 1);
    form.setFieldValue("quantity", quantity - 1);
  };

  const handleSubmit = (values: FormValues) => {
    form.setFieldValue("foodId", food.id);
    console.log("values ", values);
  };

  const [quantity, setQuantity] = useState<number>(1);
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
            <Radio
              value={Size.small}
              label="Small"
              my={8}
              color="var(--color-primary)"
              classNames={{
                label: "ml-2",
              }}
            />
            <Radio
              value={Size.medium}
              label="Medium"
              my={8}
              color="var(--color-primary)"
              classNames={{
                label: "ml-2",
              }}
            />
            <Radio
              className="my-5"
              value={Size.large}
              label="Large"
              my={8}
              color="var(--color-primary)"
              classNames={{
                label: "ml-2",
              }}
            />
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
                className="w-12 p-2 text-center focus:outline-none focus:border-primary focus:rounded-md focus:border-solid focus:border-1 "
                aria-label="order quantity input"
                key={form.key("quantity")}
                maxLength={3}
                {...form.getInputProps("quantity")}
              />

              <div
                onClick={incrementQuantity}
                className="cursor-pointer p-2 hover:bg-gray-100 hover:rounded-md"
              >
                <PlusIcon cursor="pointer" width={30} height={30} />
              </div>
            </Group>

            <Button size="md" className="bg-primary" type="submit">
              Add to Cart
            </Button>
          </Group>
        </form>
      </Container>
    </Modal>
  );
};

export default OrderModal;
