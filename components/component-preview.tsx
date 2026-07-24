import type { ReactNode } from "react";

import { ComponentSource } from "@/components/component-source";
import { PreviewToggle } from "@/components/preview-toggle";

import { ComponentPreviewClient } from "./component-preview-client";

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
    <ComponentPreviewClient name={name} className={className}>
      {children}
    </ComponentPreviewClient>
  );

  const code = (
    <ComponentSource name={name} src={src} title={title} collapsible={false} />
  );

  return <PreviewToggle demo={demo} code={code} />;
};
