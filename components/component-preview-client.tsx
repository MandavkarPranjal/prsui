"use client";

import { RotateCw } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { OpenInV0Button } from "./open-in-v0";

export const ComponentPreviewClient = ({
  name,
  children,
  className,
}: {
  name?: string;
  children: ReactNode;
  className?: string;
}) => {
  const [previewKey, setPreviewKey] = useState(0);

  const handleRestart = useCallback(() => {
    setPreviewKey((prev) => prev + 1);
  }, []);

  return (
    <div
      className={cn(
        "group relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-muted/30 p-12 backdrop-blur-sm",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.06]" />
      <div className="absolute right-4 top-4 z-50 flex gap-2">
        <OpenInV0Button url={`https://prsui.pr5.dev/r/${name}.json`} />
        <Button
          variant="outline"
          size="icon"
          onClick={handleRestart}
          className="h-8 w-8 active:scale-95 duration-300 ease-out transition-[scale,background-color,opacity] group/restart-button"
          aria-label="Restart demo"
        >
          <RotateCw className="h-4 w-4 group-hover/restart-button:rotate-45 duration-300 ease-out transition-transform" />
        </Button>
      </div>
      <div
        key={previewKey}
        className="relative z-10 flex w-full items-center justify-center isolate"
      >
        {children}
      </div>
    </div>
  );
};
