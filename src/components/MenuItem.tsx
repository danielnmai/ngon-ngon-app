import { Image, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Food } from "../schemas/menu";
import OrderModal from "./OrderModal";

type MenuItemProps = {
  food: Food;
};

const MenuItem = ({ food }: MenuItemProps) => {
  const [opened, modalHandler] = useDisclosure(false);

  const handleModalClose = () => {
    modalHandler.close();
  };

  const handleModalOpen = () => {
    modalHandler.open();
  };

  return (
    <>
      <Stack className="m-4">
        <Image src={food.photos[0]} alt={food.name} className="h-40 w-full object-cover rounded-lg cursor-pointer" onClick={handleModalOpen}/>
        <Title order={4}>{food.name}</Title>
        <Text c="gray">{food.description}</Text>
        <Text>{food.price}</Text>
      </Stack>

      <OrderModal food={food} onClose={handleModalClose} opened={opened} />
    </>
  );
};

export default MenuItem;
