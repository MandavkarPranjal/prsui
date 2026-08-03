"use client";

import { Compass, Magnet, Sparkles } from "lucide-react";

import { Magnetic } from "@/registry/new-york/magnetic";

const pressFeedback =
  "cursor-pointer transition-transform duration-150 ease-out active:scale-95";

export const MagneticDemo = () => (
  <div className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-8">
    <Magnetic>
      <button
        type="button"
        className={`flex h-12 min-w-36 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-lg ${pressFeedback}`}
      >
        <Magnet className="size-4" />
        Magnetic Pull
      </button>
    </Magnetic>
    <Magnetic>
      <button
        type="button"
        className={`flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground shadow-sm ${pressFeedback}`}
      >
        <Compass className="size-4" />
        Hover me
      </button>
    </Magnetic>
    <Magnetic hoverScale={1.12}>
      <button
        type="button"
        className={`grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg ${pressFeedback}`}
      >
        <Sparkles className="size-5" />
      </button>
    </Magnetic>
  </div>
);
