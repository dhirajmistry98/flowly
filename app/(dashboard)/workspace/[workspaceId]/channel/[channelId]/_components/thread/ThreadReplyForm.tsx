"use client";

import {
  createMessageSchema,
  createMessageSchemaType,
} from "@/app/schemas/message";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { MessageComposer } from "../message/MessageComposer";
import { useAttachmentUpload } from "@/hooks/use-attachment-upload";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { Message } from "@/lib/generated/prisma/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getAvatar } from "@/lib/get-avatar";

interface ThreadReplyFormProps {
  threadId: string;
  user: KindeUser<Record<string, unknown>>;
}

export function ThreadReplyForm({ threadId, user }: ThreadReplyFormProps) {
  const { channelId } = useParams<{ channelId: string }>();
  const upload = useAttachmentUpload();
  const [editorKey, setEditorKey] = useState(0);

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(createMessageSchema),
    defaultValues: {
      content: "",
      channelId: channelId,
      threadId: threadId,
    },
  });

  useEffect(() => {
    form.setValue("threadId", threadId);
  }, [threadId, form]);

  const createMessageMutation = useMutation(
    orpc.message.create.mutationOptions({
      onMutate: async (data) => {
        const listOptions = orpc.message.thread.list.queryOptions({
          input: {
            messageId: threadId,
          },
        });
        await queryClient.cancelQueries({
          queryKey: listOptions.queryKey,
        });

        const previous = queryClient.getQueryData(listOptions.queryKey);

        const optimistic: Message = {
          id: `optimistic-${crypto.randomUUID()}`,
          content: data.content,
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: user.id,
          authorEmail: user.email!,
          authorName: user.given_name ?? "John De",
          authorAvatar: getAvatar(user.picture, user.email!),
          channelId: data.channelId,
          threadId: data.threadId!,
          imageUrl: data.imageUrl ?? null,
        };
        queryClient.setQueryData(listOptions.queryKey, (old) => {
          if (!old) return old;

          return {
            ...old,
            messages: [...old.messages, optimistic],
          };
        });
        return {
          listOptions,
          previous,
        };
      },
      onSuccess: (_data,_vars,ctx) => {
        queryClient.invalidateQueries({queryKey:ctx.listOptions.queryKey})
        
        form.reset({ channelId, content: "", threadId });
        upload.Clear();
        setEditorKey((prev) => prev + 1);

        toast.success("Message Created successfully!");
      },
      onError(_vars, _err, ctx) {
        if (!ctx) return;

        const { listOptions, previous } = ctx;

        if (previous) {
          queryClient.setQueryData(listOptions.queryKey, previous);
        }

        return toast.error("Something went wrong!");
      },
    })
  );
  function onSubmit(data: createMessageSchemaType) {
    createMessageMutation.mutate({
      ...data,
      imageUrl: upload.stagedUrl ?? undefined,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MessageComposer
                  value={field.value}
                  onChange={field.onChange}
                  upload={upload}
                  key={editorKey}
                  onSubmit={() => onSubmit(form.getValues())}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
