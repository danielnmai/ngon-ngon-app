import {
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import styles from "./Menu.module.css";

import PlusIcon from "../Icons/PlusIcon";

type Food = {
  id: number;
  name: string;
  description: string;
  price: number;
};

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

const Menu = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:3000/v1/foods");
        const data = await res.json();

        setFoods(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoods();
  }, []);

  console.log("foods ", foods);

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
          {foods.map((foodItem) => (
            <MenuItem food={foodItem} />
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
};

export default Menu;
