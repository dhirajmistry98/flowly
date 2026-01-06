"use client";

import {
  createMassageSchema,
  createMassageSchemaType,
} from "@/app/schemas/message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MessageComposer } from "./MessageComposer";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { useState } from "react";
import { useAttachmentUpload } from "@/hooks/use-attachment-upload";
import {Message} from "react-hook-form"
import { userAgent } from "next/server";

interface iAppProps {
  channelId: string;
}

type MessagePage = {items: Message[]; nextCursor?: string
};

type InfiniteMessages = InfiniteData<MessagePage>;


export function MessageInputForm({ channelId }: iAppProps) {
  const queryClient = useQueryClient();

  const [editorKey, setEditorKey] = useState(0);

  const upload = useAttachmentUpload();

  

  const form = useForm({
    resolver: zodResolver(createMassageSchema),

    defaultValues: {
      channelId: channelId,
      content: "",
    },
  });

  const createMassageMutation = useMutation(
    orpc.message.create.mutationOptions({
      onMutate: async (data) => {
        await queryClient.cancelQueries({
          queryKey: ["message.list", channelId],
        });
        const previousData = queryClient.getQueryData<InfiniteMessages>([
          "message.list",
          channelId,
        ]);

        const tempId = `optimistic-${crypto.randomUUID()}`;

        const optimisticMessage: Message = {
          id: tempId,
          content: data.content,
          imageUrl:data.imageUrl ?? null,
          createdAt: new Date(),
          updatedAt: new Date(),
          authorId: userAgent.id
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.message.list.key(),
        });

        form.reset({ channelId, content: "" });
        upload.Clear();
        setEditorKey((k) => k + 1);
        return toast.success("message created successfully");
      },
      onError: () => {
        return toast.error("something went wrong");
      },
    })
  );

  function onSubmit(data: createMassageSchemaType) {
    createMassageMutation.mutate({
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
                  key={editorKey}
                  value={field.value}
                  onChange={field.onChange}
                  onSubmit={() => onSubmit(form.getValues())}
                  isSubmitting={createMassageMutation.isPending}
                  upload={upload}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
