import {
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Food } from "../../schemas/menu";
import APIService from "../../services/api";

type MenuItemProps = {
  food: Food;
};

const MenuItem = ({ food }: MenuItemProps) => {
  return (
    <Stack className="m-4">
      <Paper
        className="flex justify-end items-end bg-[url('src/assets/pictures/bun-dau-mam-tom.jpg')] bg-cover bg-center min-w-[20rem] h-40"
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
  );
};

const fetchMenu = async () => {
  const api = new APIService();
  const { data } = await api.fetchMenu();
  return data;
};

const Menu = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchMenu"],
    queryFn: fetchMenu,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <section id="menu" className="flex justify-center items-center">
      <Container className="pt-12 ml-4 mr-4 h-full max-w-[1920px]">
        <Title className="font-cormorant text-primary" order={1}>
          ORDER ONLINE
        </Title>
        <Title order={3} className="font-cormorant text-primary">
          We cook fresh for each order, minimum preparation time is 3 hours.
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {data.map((foodItem) => (
            <MenuItem food={foodItem} />
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
};

export default Menu;
