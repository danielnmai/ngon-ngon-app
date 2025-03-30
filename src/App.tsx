import "./App.css";

import { createTheme, MantineProvider, Radio } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "40em",
    md: "48em",
    lg: "64em",
    xl: "80em",
  },
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
        <BrowserRouter>
          <CartProvider>
            <main className="flex flex-col min-h-screen">
              <Header />
              <div className="grow">
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="cart" element={<Cart />} />
                </Routes>
              </div>
              <Footer />
            </main>
          </CartProvider>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
