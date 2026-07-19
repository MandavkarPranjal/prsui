"use client";

import { PenTool, Share2 } from "lucide-react";

import { SplitActions } from "./split-action";

export const SplitActionDemo = () => {
  const actions = [
    { icon: PenTool, label: "Edit" },
    { icon: Share2, label: "Share" },
  ];
  return (
    <SplitActions
      actions={actions}
      onActionClick={(action, index) => {
        console.log(`Clicked ${action.label} at index ${index}`);
      }}
    />
  );
};
