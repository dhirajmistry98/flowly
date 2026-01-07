import { createChannel, getChannel, listChannels } from "./channel";
import { createMessage, listMessages } from "./message";
import { createWorkspace, ListWorkspace } from "./workspace";

export const router = {
  workspace: {
    list: ListWorkspace,
    create: createWorkspace,
  },
  channel: {
    create: createChannel,
    list: listChannels,
    get:getChannel
  },
  message: {
    create: createMessage,
    list:listMessages,
  }
};

