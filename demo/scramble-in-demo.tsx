"use client";

import ScrambleIn from "@/registry/new-york/scramble-in";

export const ScrambleInPreview = () => (
  <div className="flex min-h-72 flex-col items-center justify-center gap-8 px-6 py-12">
    <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
      <ScrambleIn
        text="Built for developers"
        scrambleSpeed={40}
        scrambledLetterCount={3}
      />
    </h1>
    <p className="max-w-md text-center text-lg text-muted-foreground leading-relaxed">
      <ScrambleIn
        text="Every animation resolves into clarity."
        scrambleSpeed={25}
        scrambledLetterCount={2}
      />
    </p>
  </div>
);
