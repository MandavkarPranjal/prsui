"use client";

import ScrambleIn from "@/registry/new-york/scramble-in";

export const ScrambleInPreview = () => (
  <div className="flex flex-col items-center gap-16 px-6 py-16">
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-5xl font-medium tracking-tight text-foreground font-mono sm:text-4xl md:text-6xl">
        <ScrambleIn
          text="Built for developers"
          scrambleSpeed={40}
          scrambledLetterCount={3}
          className="font-mono"
          scrambledClassName="text-muted-foreground/40 font-mono"
        />
      </h1>
    </div>

    <p className="max-w-md text-center text-lg text-muted-foreground leading-relaxed font-mono">
      <ScrambleIn
        text="Every animation resolves into clarity."
        scrambleSpeed={25}
        scrambledLetterCount={3}
        className="font-mono"
        scrambledClassName="text-muted-foreground/40 font-mono"
      />
    </p>
  </div>
);
