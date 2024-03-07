import { z } from "zod";

export const searchSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Search cannot be empty" })
    .refine((value) => !/^\s*$/.test(value), {
      message: "The search does not just have spaces",
    }),
});