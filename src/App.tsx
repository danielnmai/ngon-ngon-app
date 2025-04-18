import "./App.css";

import { createTheme, MantineProvider, Radio } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AuthContextProvider } from "./contexts/AuthContext";
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
      <GoogleOAuthProvider clientId="84030187879-glv8pcq0q4brg0q0d2c9ch35hhvgpr4h.apps.googleusercontent.com">
        <MantineProvider theme={theme}>
          <BrowserRouter>
            <CartProvider>
              <AuthContextProvider>
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
              </AuthContextProvider>
            </CartProvider>
          </BrowserRouter>
        </MantineProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
