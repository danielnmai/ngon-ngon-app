import { Paper, SimpleGrid, Text, Title } from "@mantine/core";
import styles from "./Menu.module.css";

const MenuItem = () => {
  return (
    <Paper className={styles.menuItem}>
      <Text size="sm">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>
    </Paper>
  );
};

const Menu = () => {
  return (
    <section id="menu">
      <div className={styles.container}>
        <Title className={styles.title} order={1}>
          ORDER ONLINE
        </Title>
        <Title order={3} className={styles.subtitle}>
          We cook fresh for each order, minimum preparation time is 3 hours.
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </SimpleGrid>
      </div>
    </section>
  );
};

export default Menu;
