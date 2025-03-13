import {
  Button,
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
    <Modal opened={opened} onClose={onClose} centered size="md">
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
            classNames={{
              label: "ml-2",
            }}
          />
          <Radio
            value={Size.medium}
            label="Medium"
            my={8}
            classNames={{
              label: "ml-2",
            }}
          />
          <Radio
            className="my-5"
            value={Size.large}
            label="Large"
            my={8}
            classNames={{
              label: "ml-2",
            }}
          />
        </Radio.Group>

        <Textarea
          label="Special Request"
          placeholder="More salty? Extra sauce? We'll try our best to accomodate."
          my={10}
          key={form.key("specialRequest")}
          {...form.getInputProps("specialRequest")}
        />

        <Group w="100%" justify="space-between" m={10} className="select-none">
          <Group w="40%" justify="space-between">
            <div onClick={decrementQuantity} className="cursor-pointer p-2">
              <MinusIcon width={30} height={30} />
            </div>
            <div className="select-none">{quantity}</div>
            <div onClick={incrementQuantity} className="cursor-pointer p-2">
              <PlusIcon cursor="pointer" width={30} height={30} />
            </div>
          </Group>

          <Button type="submit">Add to Cart</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default OrderModal;
