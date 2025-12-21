import { createWorkspace, ListWorkspace } from "./workspace";

export const router = {
 workspace:{
  list : ListWorkspace,
  create: createWorkspace,
 }
} 