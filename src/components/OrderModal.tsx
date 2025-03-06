import { Image, Modal, Stack, Text, Title } from "@mantine/core";
import { Food } from "../schemas/menu";

type ModalProps = {
  food: Food;
  opened: boolean;
  onClose: () => void;
};

const OrderModal = ({ food, opened, onClose }: ModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} centered>
      <Stack>
        <Title order={3}>{food.name}</Title>
        <Text>{food.description}</Text>
        <Image src="src/assets/pictures/bun-dau-mam-tom.jpg" />
      </Stack>
    </Modal>
  );
};

export default OrderModal;
