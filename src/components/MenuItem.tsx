import { Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
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
        <Paper
          onClick={handleModalOpen}
          className="flex justify-end items-end bg-[url('src/assets/pictures/bun-dau-mam-tom.jpg')] bg-cover bg-center min-w-[20rem] h-40 hover:cursor-pointer"
          radius="lg"
        >
          <div className="flex justify-center items-center h-8 w-8 rounded-full bg-white m-4">
            <Plus className="h-4 w-4" />
          </div>
        </Paper>
        <Title order={4}>{food.name}</Title>
        <Text c="gray">{food.description}</Text>
        <Text>{food.price}</Text>
      </Stack>

      <OrderModal food={food} onClose={handleModalClose} opened={opened} />
    </>
  );
};

export default MenuItem;
