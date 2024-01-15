import { z } from "zod";

export interface Item {
  userId: number;
  id: number;
  title: string;
  body: string;
}
// Data validation
export const dataSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    userId: z.number(),
  })
  .array();

export type Data = z.infer<typeof dataSchema>;
