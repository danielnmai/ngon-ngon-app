import "@mantine/core/styles.css";
import "./App.css";
import "./components/Header/Header";

import { MantineProvider } from "@mantine/core";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <MantineProvider>
      <Header />
      <Hero />
      <section id="menu">
        <Menu />
      </section>
    </MantineProvider>
  );
}

export default App;
