import { Title } from "@mantine/core";
import styles from "./Menu.module.css";

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
        <p>
          Menu. This is some long text. This is some long text. This is some
          long text. This is some long text. This is some long text. This is
          some long text. This is some long text. This is some long text. This
          is some long text. This is some long text. This is some long text.
          This is some long text. This is some long text. This is some long
          text. This is some long text
        </p>
      </div>
    </section>
  );
};

export default Menu;
