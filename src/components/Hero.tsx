import { Button, Container, Overlay, Title } from "@mantine/core";

export const Hero = () => {
  return (
    <div className="relative bg-[url('src/assets/pictures/bun-dau-mam-tom.jpg')] bg-cover bg-center">
      <Overlay opacity={1} zIndex={0} />
      <Container className="relative sm:h-[700px] h-[500px] flex flex-col justify-end items-start pb-20">
        <Title className="font-bebas text-white sm:text-8xl text-4xl">
          THAT VIETNAMESE TREAT
        </Title>
        <Title
          className="font-cormorant text-white sm:text-3xl text-xl"
          order={3}
        >
          The best Vietnamese treats you'll ever have. Nothing more. Nothing
          less.
        </Title>

        <Button size="xl" radius="sm" className="bg-primary mt-2">
          Order Now
        </Button>
      </Container>
    </div>
  );
};
