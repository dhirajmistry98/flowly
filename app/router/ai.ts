import z from "zod";
import { requiredAuthMiddleware } from "../middlewares/auth";
import { base } from "../middlewares/base";
import { requiredWorkSpaceMiddleware } from "../middlewares/workspace";
import prisma from "@/lib/db";
import { jsonToMarkdown } from "@/lib/json.markdown";
import {streamText} from "ai";
import { createOpenRouter } from '@openrouter/ai-sdk-provider';


const openrouter = createOpenRouter({
  apiKey: process.env.LLM_KEY,
});

export const generateThreadSummary = base
  .use(requiredAuthMiddleware)
  .use(requiredWorkSpaceMiddleware)
  .route({
    method: "GET",
    path: "/ai/thread/summary",
    summary: "Generate thread summary",
    tags: ["Ai"],
  })
  .input(
    z.object({
      messageId: z.string(),
    }),
  )
  .handler(async ({ input, context, errors }) => {
    const baseMessage = await prisma.message.findFirst({
      where: {
        id: input.messageId,
        channel: {
          workspaceId: context.workspace.orgCode,
        },
      },
      select: {
        id: true,
        threadId: true,
      },
    });
    if (!baseMessage) {
      throw errors.NOT_FOUND();
    }
    const parentId = baseMessage.threadId ?? baseMessage.id;
    const parent = await prisma.message.findFirst({
      where: {
        id: parentId,
        channel: {
          workspaceId: context.workspace.orgCode,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        authorName: true,
        replies: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            authorName: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!parent) {
      throw errors.NOT_FOUND();
    }
    const replies = parent.replies.slice().reverse();

     const parentText = await jsonToMarkdown(parent.content)

     const lines = [];

     lines.push(`Thread Root - ${parent.authorName} - ${parent.createdAt.toISOString()}`
    );
    lines.push(parentText);
    if (replies.length > 0 ) {
       lines.push("\nReplies");
       for (const r of replies) {
        const t = await jsonToMarkdown(r.content)
        lines.push(`-${r.authorName} - ${r.createdAt.toISOString()}:${t}`);
       }
    }
    const compiled = lines.join("\n");


    const result  = streamText({

    })
  }); 
