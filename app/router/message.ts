import z from "zod";
import { standardSecuritymiddleware } from "../middlewares/arcjet/standard";
import { writeSecuritymiddleware } from "../middlewares/arcjet/write";
import { requiredAuthMiddleware } from "../middlewares/auth";
import { base } from "../middlewares/base";
import { requiredWorkSpaceMiddleware } from "../middlewares/workspace";
import prisma from "@/lib/db";
import { createMassageSchema } from "../schemas/message";
import { getAvatar } from "@/lib/get-avatar";
import { Message } from "@/lib/generated/prisma/client";
import { readSecuritymiddleware } from "../middlewares/arcjet/heavy-write";

export const createMessage = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkSpaceMiddleware)
  .use(standardSecuritymiddleware)
  .use(writeSecuritymiddleware)
  .route({
    method: "POST",
    path: "/messages",
    summary: "Create a message",
    tags: ["Messages"],
  })
  .input(createMassageSchema)
  .output(z.custom<Message>())
  .handler(async ({ input, context, errors }) => {
    const channel = await prisma.channel.findFirst({
      where: {
        id: input.channelId,
        workspaceId: context.workspace.orgCode,
      },
    });
    if (!channel) {
      throw errors.FORBIDDEN();
    }

    const created = await prisma.message.create({
      data: {
        content: input.content,
        imageUrl: input.imageUrl,
        channelId: input.channelId,
        authorId: context.user.id,
        authorEmail: context.user.email!,
        authorName: context.user.given_name ?? "John Doe",
        authorAvatar: getAvatar(context.user.picture, context.user.email!),
      },
    });
    return {
      ...created,
    };
  });

export const listMessages = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkSpaceMiddleware)
  .use(standardSecuritymiddleware)
  .use(readSecuritymiddleware)
  .route({
    method: "GET",
    path: "/messages",
    summary: "List All messages",
    tags: ["Messages"],
  })
  .input(z.object({
    channelId:z.string()
  }))
  .output(z.array(z.custom<Message>()))
  .handler(async ({ input, context, errors }) => {
    const channel = await prisma.channel.findFirst({
      where: {
        id: input.channelId,
        workspaceId: context.workspace.orgCode,
      },
    });

    if (!channel) {
      throw errors.FORBIDDEN();
    }
    const data = await prisma.message.findMany({
      where: {
        channelId: input.channelId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return data;
  });
