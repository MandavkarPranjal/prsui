import type { ReactNode } from "react";

import { ComponentSource } from "@/components/component-source";
import { PreviewToggle } from "@/components/preview-toggle";
import { cn } from "@/lib/utils";

export const ComponentPreview = ({
  name,
  src,
  title,
  children,
  className,
}: {
  name?: string;
  src?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
}) => {
  const demo = (
    <div
      className={cn(
        "group relative flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-muted/30 p-12 backdrop-blur-sm",
        className
      )}
    >
      {/* Subtle dot grid pattern */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.06]" />
      <div className="relative z-10 flex w-full items-center justify-center">
        {children}
      </div>
    </div>
  );

  const code = (
    <ComponentSource name={name} src={src} title={title} collapsible={false} />
  );

  return <PreviewToggle demo={demo} code={code} />;
};
