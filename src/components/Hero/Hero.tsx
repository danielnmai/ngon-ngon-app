import { Button, Container, Overlay, Title } from "@mantine/core";
import classes from "./Hero.module.css";

export const Hero = () => {
  return (
    <div className={classes.hero}>
      <Overlay opacity={1} zIndex={0} />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>That Vietnamese Treat</Title>
        <Title className={classes.description} order={3}>
          The best Vietnamese treats you'll ever have. Nothing more. Nothing
          less.
        </Title>

        <Button size="xl" radius="sm" className={classes.control}>
          Order Now
        </Button>
      </Container>
    </div>
  );
};
