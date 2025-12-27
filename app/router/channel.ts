import z from "zod";
import { heavyWriteSecuritymiddleware } from "../middlewares/arcjet/read";
import { standardSecuritymiddleware } from "../middlewares/arcjet/standard";
import { requiredAuthMiddleware } from "../middlewares/auth";
import { base } from "../middlewares/base";
import { requiredWorkSpaceMiddleware } from "../middlewares/workspace";
import { ChannelNameSchema } from "../schemas/channel";
import prisma from "@/lib/db";
import { Channel } from "@/lib/generated/prisma/client";

export const createChannel = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkSpaceMiddleware)
  .use(standardSecuritymiddleware)
  .use(heavyWriteSecuritymiddleware)
  .route({
    method: "POST",
    path: "/channels",
    summary: "Create a new Channel",
    tags: ["channels"],
  })
  .input(ChannelNameSchema)
  .output(z.custom<Channel>())
  .handler(async ({ input, context }) => {
     const channel = await prisma.channel.create({
      data:{
           name: input.name,
           workspaceId: context.workspace.orgCode,
           createdById: context.user.id,
      },
     });
     return channel;
  });
