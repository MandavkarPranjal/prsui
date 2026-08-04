"use client";

import MorphingText from "@/registry/new-york/morphing-text";

export const MorphingTextPreview = () => (
  <div className="flex flex-col items-center gap-16 px-6 py-16">
    <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
      We build products that
      <MorphingText
        words={["delight", "inspire", "endure", "scale"]}
        interval={2200}
        className="ml-3 text-primary"
      />
    </h1>
  </div>
);
