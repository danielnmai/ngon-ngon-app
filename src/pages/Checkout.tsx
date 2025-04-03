import { useQuery } from "@tanstack/react-query";
import APIService from "../services/api";

const Checkout = () => {
  const API = new APIService();

  const { isPending, error, data } = useQuery({
    queryKey: ["fetchMenu"],
    queryFn: () => API.fetchUser("6"),
  });

  console.log("data", data);
  console.log("ispending", isPending);
  console.log("error", error);

  return <div>Checkout</div>;
};

export default Checkout;
