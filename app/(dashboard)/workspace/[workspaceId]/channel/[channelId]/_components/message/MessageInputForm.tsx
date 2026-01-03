"use client"

import { createMassageSchema, createMassageSchemaType } from "@/app/schemas/message";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc";
import { toast } from "sonner";
import { useState } from "react";

interface iAppProps {
  channelId: string;
}

export function MessageInputForm({ channelId }: iAppProps) {
  const queryClient = useQueryClient()

  const [editorKey,setEditorKey] = useState(0)

  const form = useForm({
    resolver: zodResolver(createMassageSchema),
    defaultValues: {
      channelId: channelId,
      content: "",
    },
  });

  const createMassageMutation = useMutation(
    orpc.message.create.mutationOptions({
      onSuccess:()=> {
        queryClient.invalidateQueries({
          queryKey: orpc.message.list.key(),
        })

         form.reset({channelId,content:""})
         setEditorKey((k)=> k + 1);
        return toast.success('message created successfully');
      },
      onError:() =>{
        return toast.error('something went wrong');
      }
    })
  )

  function onSubmit(data:createMassageSchemaType){
createMassageMutation.mutate(data);
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
                  onSubmit={()=>onSubmit(form.getValues())}
                  isSubmitting={createMassageMutation.isPending}
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
