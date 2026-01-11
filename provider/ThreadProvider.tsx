"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface ThreadContextType {
  selectedThreadId: string | null;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [selectedThreadId, setSelectedThreadId] = useState(null);

  const value: ThreadContextType = {
    selectedThreadId,
  };
  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
}

export function useThreadContext() {
  const context = useContext(ThreadContext);

  if (context === undefined) {
    throw new Error("useThread must be used within a ThreadProvider");
  }
  return context;
}