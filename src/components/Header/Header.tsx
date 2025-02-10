import { Anchor, Button, Group } from "@mantine/core";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div>Logo</div>
      <Group>
        <Button variant="outline">Order Now</Button>
        <Anchor variant="outline" href="#menu">
          Menu
        </Anchor>

        <Button variant="outline">Log In</Button>
      </Group>
    </header>
  );
};
