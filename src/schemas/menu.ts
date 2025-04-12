import { z } from "zod";

const FoodOptionSchema = z.object({
  id: z.number(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  price: z.number(),
  minQuantity: z.number(),
  foodId: z.number(),
});

const FoodSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  options: z.array(FoodOptionSchema),
  photos: z.array(z.string()),
});

export type Food = z.infer<typeof FoodSchema>;
export type FoodOption = z.infer<typeof FoodOptionSchema>;
export default FoodSchema;
