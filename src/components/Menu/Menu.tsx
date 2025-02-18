import {
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import styles from "./Menu.module.css";

import { useQuery } from "@tanstack/react-query";
import { Food } from "../../schemas/menu";
import APIService from "../../services/api";
import PlusIcon from "../Icons/PlusIcon";

type MenuItemProps = {
  food: Food;
};

const MenuItem = ({ food }: MenuItemProps) => {
  return (
    <Stack className={styles.menuItemContainer}>
      <Paper className={styles.menuItemDisplay} radius="lg">
        <PlusIcon className={styles.menuSelectionIcon} />
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
    <section id="menu" className={styles.menuSection}>
      <Container className={styles.container}>
        <Title className={styles.title} order={1}>
          ORDER ONLINE
        </Title>
        <Title order={3} className={styles.subtitle}>
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
