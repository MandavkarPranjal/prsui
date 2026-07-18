"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const PreviewToggle = ({
  demo,
  code,
}: {
  demo: ReactNode;
  code: ReactNode;
}) => {
  const [view, setView] = useState<"demo" | "code">("demo");

  return (
    <div className="my-8">
      <div className="flex items-center justify-start gap-1 pb-2 text-sm">
        <button
          type="button"
          onClick={() => setView("demo")}
          className={cn(
            "rounded-md px-2 py-1 font-medium transition-colors",
            view === "demo"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Demo
        </button>
        <button
          type="button"
          onClick={() => setView("code")}
          className={cn(
            "rounded-md px-2 py-1 font-medium transition-colors",
            view === "code"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Code
        </button>
      </div>
      {view === "demo" ? demo : code}
    </div>
  );
};
