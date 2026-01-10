import z from "zod";

export const createMassageSchema = z.object({
  channelId: z.string(),
  content:z.string(),
  imageUrl: z.url().optional(),
});

export const  updateMassageSchema = z.object({
  messageId: z.string(),
  content:z.string(),
})

export type updateMassageSchemaType = z.infer<typeof updateMassageSchema>
export type createMassageSchemaType = z.infer<typeof createMassageSchema>