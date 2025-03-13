import {
  Button,
  Group,
  Image,
  Modal,
  Radio,
  Stack,
  Text,
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
};

const OrderModal = ({ food, opened, onClose }: ModalProps) => {
  const form = useForm<FormValues>({
    initialValues: {
      quantity: 1,
      size: Size.small,
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
    console.log("values ", values);
  };

  const [quantity, setQuantity] = useState<number>(1);
  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack>
        <Title order={3}>{food.name}</Title>
        <Text>{food.description}</Text>
        <Image src="src/assets/pictures/bun-dau-mam-tom.jpg" />
      </Stack>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Radio.Group {...form.getInputProps("size")} key={form.key("size")}>
          <Radio value={Size.small} label="Small" />
          <Radio value={Size.medium} label="Medium" />
          <Radio value={Size.large} label="Large" />
        </Radio.Group>

        <Group w="100%" justify="space-between" mt={5}>
          <Group w="40%" justify="space-between">
            <MinusIcon
              onClick={decrementQuantity}
              cursor="pointer"
              width={30}
              height={30}
            />
            <div className="select-none">{quantity}</div>
            <PlusIcon
              onClick={incrementQuantity}
              cursor="pointer"
              width={30}
              height={30}
            />
          </Group>
          <Button type="submit">Add to Cart</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default OrderModal;
