import { Anchor, Button, Group } from "@mantine/core";

export const Header = () => {
  return (
    <header className="sticky top-0 h-12 bg-white w-full flex justify-between z-50">
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
