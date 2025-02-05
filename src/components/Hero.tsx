import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import classes from "./Hero.module.css";

export const Hero = () => {
  return (
    <div className={classes.hero}>
      <Overlay opacity={0.8} zIndex={0} />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>That Vietnamese Treat</Title>
        <Text className={classes.description} size="xl" mt="xl">
          The best Vietnamese treats you'll ever have. Nothing more. Nothing
          less.
        </Text>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
        >
          Order Now
        </Button>
      </Container>
    </div>
  );
};
