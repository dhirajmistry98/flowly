import {  EmojiReaction } from "./EmojiReaction";

export function ReactionsBar(){
  return(
    <div className="mt-1 flex items-center gap-1">
    <EmojiReaction/>
    </div>
  )
}