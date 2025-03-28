import CartDrawer from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import Menu from "../components/Menu";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Menu />
      <Footer />
      <CartDrawer />
    </>
  );
};

export default Home;
