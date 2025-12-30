import z from "zod";

export const createMassageSchema = z.object({
  channelId: z.string(),
  content:z.string(),
  imageUrl: z.url().optional(),
})

export type createMassageSchemaType = z.infer<typeof createMassageSchema>