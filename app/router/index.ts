import { createChannel, listChannels } from "./channel";
import { createWorkspace, ListWorkspace } from "./workspace";

export const router = {
 workspace:{
  list : ListWorkspace,
  create: createWorkspace,
 },
 channel:{
  create: createChannel,
  list: listChannels,
 }
} 