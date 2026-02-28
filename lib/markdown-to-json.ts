import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";
import { generateJSON } from "@tiptap/core";
import { editorExtensions } from "@/components/rich-text-editor/extensions";

const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

export function markdownToJson(markdown: string) {
  const html = md.render(markdown);
  const cleanHTML = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  return generateJSON(cleanHTML, editorExtensions);
}
