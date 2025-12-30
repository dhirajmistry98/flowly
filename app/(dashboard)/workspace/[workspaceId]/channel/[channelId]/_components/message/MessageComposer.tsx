import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor/Editor";
import { ImageIcon, Send } from "lucide-react";

interface iAppProps {
  value: string;
  onChange: (next: string) => void;
}
export function MessageComposer({ value, onChange }: iAppProps) {
  return (
    <>
      <RichTextEditor
        field={{
          value,
          onChange,
        }}
        sendButton={
          <Button type="button" size="sm">
            <Send className="size-4 mr-1"/>
            Send
          </Button>
        }
        footerLeft={
          <Button type="button" size="sm" variant="outline">
       <ImageIcon className="size-4 mr-1"/>
       Attach
          </Button>
        }
      />
    </>
  );
}
