"use client";

import { useDialKit } from "dialkit";

import ScrambleHover from "@/registry/new-york/scramble-hover";

const config = {
  direction: {
    default: "start",
    options: ["start", "center", "end"],
    type: "select" as const,
  },
  maxIterations: [10, 1, 30] as [number, number, number],
  sequential: true,
  speed: [40, 5, 100] as [number, number, number],
};

export const ScrambleHoverPreview = () => {
  const values = useDialKit("scramble-hover", config);

  return (
    <div className="flex flex-col items-center gap-16 px-6 py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-5xl font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl">
          <ScrambleHover
            text="Move your cursor"
            scrambleSpeed={values.speed}
            sequential={values.sequential}
            revealDirection={values.direction as "start" | "end" | "center"}
            maxIterations={values.maxIterations}
            scrambledClassName="text-muted-foreground/50"
            className="font-mono"
          />
        </h1>
        <p className="text-sm text-muted-foreground tracking-wide uppercase">
          Hover to scramble
        </p>
      </div>
    </div>
  );
};
