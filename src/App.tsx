import "./App.css";

import { createTheme, MantineProvider, Radio } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import Menu from "./components/Menu";

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    Radio: Radio.extend({
      styles: {
        label: { userSelect: "none" },
      },
    }),
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Header />
        <Hero />
        <Menu />
        <Footer />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
