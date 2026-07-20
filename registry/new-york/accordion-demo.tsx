"use client";

import { BookOpen, Bug, Info, LayoutGrid, Space, SunMoon } from "lucide-react";

import { Accordion } from "./accordion";

const items = [
  {
    description:
      "This is a demo platform used to showcase features and test UI components during development.",
    icon: <LayoutGrid className="h-4 w-4" />,
    id: "platform",
    title: "What is this platform?",
  },
  {
    description:
      "Yes. You can switch between light and dark themes from the settings menu.",
    icon: <SunMoon className="h-4 w-4" />,
    id: "mode",
    title: "Is there a dark mode?",
  },
  {
    description:
      "The latest versions of Chrome, Firefox, Safari, and Edge are officially supported.",
    icon: <Info className="h-4 w-4" />,
    id: "support",
    title: "What browsers are supported?",
  },
  {
    description:
      "This is a demo environment, so some sections intentionally use sample text and mock data.",
    icon: <Space className="h-4 w-4" />,
    id: "placeholder",
    title: "Why am I seeing placeholder content?",
  },
  {
    description:
      "Check the documentation or contact the project maintainers for additional information.",
    icon: <BookOpen className="h-4 w-4" />,
    id: "learn",
    title: "Where can I learn more?",
  },
  {
    description:
      "Use the feedback form or contact the development team with steps to reproduce the issue.",
    icon: <Bug className="h-4 w-4" />,
    id: "bug",
    title: "How do I report a bug?",
  },
];

export const BouncyAccordionPreview = function BouncyAccordionPreview() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Accordion items={items} defaultValue="platform" />
      </div>
    </div>
  );
};
