import { GroupedReactionSchemaType } from "@/app/schemas/message";
import { Message } from "./generated/prisma/client";

export type MessagelistItem = Message & {
  repliesCount: number;
  reactions: GroupedReactionSchemaType[]
};