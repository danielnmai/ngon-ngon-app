import { z } from "zod";

const FoodSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export type Food = z.infer<typeof FoodSchema>;
export default FoodSchema;
