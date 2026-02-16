import { baseExtensions } from "@/components/rich-text-editor/extensions";
import { renderToMarkdown } from "@tiptap/static-renderer/pm/markdown";
import type { JSONContent } from "@tiptap/core";

function normalizeWhiteSpace(markdown: string) {
  return markdown
    .replace(/\s+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function jsonToMarkdown(json: string) {
  try {
    const content = JSON.parse(json) as JSONContent;

    const markdown = renderToMarkdown({
      extensions: baseExtensions,
      content,
    });

    return normalizeWhiteSpace(markdown);
  } catch {
    return "";
  }
}
