import { createContext, useContext, ReactNode } from "react";

export interface ToolContextValue {
  name: string;
  description: string;
}

const ToolContext = createContext<ToolContextValue | null>(null);

export function ToolProvider({
  children,
  name,
  description,
}: {
  children: ReactNode;
  name: string;
  description: string;
}) {
  return (
    <ToolContext.Provider value={{ name, description }}>
      {children}
    </ToolContext.Provider>
  );
}

export function useToolContext() {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error("useToolContext must be used within a ToolProvider");
  }
  return context;
}
