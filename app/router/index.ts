import { createChannel, getChannel, listChannels } from "./channel";
import { inviteMember, listMembers } from "./member";
import { createMessage, listMessages } from "./message";
import { createWorkspace, ListWorkspace } from "./workspace";

export const router = {
  workspace: {
    list: ListWorkspace,
    create: createWorkspace,
    member:{
      list:listMembers,
      invite: inviteMember,
    }
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

