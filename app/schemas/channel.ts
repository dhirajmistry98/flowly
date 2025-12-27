import z from "zod";

export function transformChannelName(name: string) {
  return name
    .toLocaleLowerCase()
    .replace(/\s+/g, "_") //replace spaces with dashes
    .replace(/[^a-z0-9_-]/g, "") //remove special characters(keep only letters,number and dashes)
    .replace(/[_-]+/g, "_") //replace multiple consecutive dashes with single dash
    .replace(/^[_-]+|[_-]+$/g, ""); //remove leading/trailing dashes
}
export const ChannelNameSchema = z.object({
  name: z
    .string()
    .min(2, "Channel must be at least 2 characters")
    .max(50, "Channel must be 50 characters")
    .transform((name,ctx)=> {
    const transformed = transformChannelName(name);
 
    if (transformed.length < 2) {
      ctx.addIssue({
        code:'custom',
        message:"Channel name must contain at least 2 characters after transformation"
      })

      return z.NEVER;
    }
    return transformed
    })
});


export type ChannelSchemaNameType = z.infer<typeof ChannelNameSchema>
