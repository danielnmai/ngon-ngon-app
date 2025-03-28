import "./App.css";

import { createTheme, MantineProvider, Radio } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { CartProvider } from "./contexts/CartContext";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import OrderSummary from "./pages/OrderSummary";

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
        <BrowserRouter>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order" element={<OrderSummary />} />
            </Routes>
          </CartProvider>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
