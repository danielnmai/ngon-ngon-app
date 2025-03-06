import "./App.css";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import Menu from "./components/Menu";

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
