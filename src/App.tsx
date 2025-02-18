import "@mantine/core/styles.css";
import "./App.css";
import "./components/Header/Header";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import Menu from "./components/Menu/Menu";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Header />
        <Hero />
        <Menu />
        <Footer />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
