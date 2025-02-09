import "@mantine/core/styles.css";
import "./App.css";
import "./components/Header/Header";

import { MantineProvider } from "@mantine/core";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import Menu from "./components/Menu/Menu";

function App() {
  return (
    <MantineProvider>
      <Header />
      <Hero />
      <Menu />
      <Footer />
    </MantineProvider>
  );
}

export default App;
