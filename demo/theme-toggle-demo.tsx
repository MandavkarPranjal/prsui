"use client";

import { useDialKit } from "dialkit";
import { useTheme } from "next-themes";

import { ThemeToggle } from "@/registry/new-york/theme-toggle";
import type { TransitionVariant } from "@/registry/new-york/theme-toggle";

const config = {
  duration: [200, 100, 1000] as [number, number, number],
  fromCenter: false,
  variant: {
    default: "circle",
    options: [
      "circle",
      "square",
      "triangle",
      "diamond",
      "hexagon",
      "rectangle",
      "star",
    ],
    type: "select" as const,
  },
};

export const ThemeToggleDemo = () => {
  const values = useDialKit("theme-toggle", config);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-8">
      <ThemeToggle
        variant={values.variant as TransitionVariant}
        fromCenter={values.fromCenter as boolean}
        duration={values.duration as number}
        theme={resolvedTheme === "dark" ? "light" : "dark"}
        onThemeChange={setTheme}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
      />
    </div>
  );
};
