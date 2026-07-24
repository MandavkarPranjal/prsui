"use client";

import type { Transition } from "motion";

import { TextHighlighter } from "@/registry/new-york/text-highlight";

export default function TextHighlighterDemo() {
  const transition = { bounce: 0, delay: 0.4, duration: 1, type: "spring" };
  const highlightClass = "rounded-[0.3em] px-px";
  const highlightColor = "#f6339a";
  const inViewOptions = { amount: 0.1, initial: true, once: true };

  return (
    <div className="flex flex-col justify-center space-y-4 w-full">
      <h1 className="text-4xl font-medium mb-10 font-calendas tracking-tight">
        Typeface alphabets
      </h1>

      <div className="text leading-normal space-y-4 font-overusedGrotesk ">
        <p className="whitespace-break-spaces">
          The present-day designer has a host of printing types at his disposal.{" "}
          <TextHighlighter
            className={highlightClass}
            transition={transition as Transition}
            highlightColor={highlightColor}
            useInViewOptions={inViewOptions}
          >
            Since Gutenberg first invented movable type in 1436-55
          </TextHighlighter>{" "}
          hundreds of different types have been designed and cast in lead.{" "}
          <TextHighlighter
            className={highlightClass}
            transition={transition as Transition}
            highlightColor={highlightColor}
            useInViewOptions={inViewOptions}
            direction="rtl"
          >
            The most recent technical developments
          </TextHighlighter>{" "}
          with computer and photo-typesetting have once again brought new faces
          on the market.{" "}
        </p>

        <p className="whitespace-break-spaces">
          <TextHighlighter
            className={highlightClass}
            transition={transition as Transition}
            highlightColor={highlightColor}
            useInViewOptions={inViewOptions}
            direction="btt"
          >
            The choice is up to the designer
          </TextHighlighter>{" "}
          to use good or poor typefaces for his design work. Knowledge of the
          quality of a typeface is of the greatest importance for the{" "}
          <TextHighlighter
            className={highlightClass}
            transition={transition as Transition}
            highlightColor={highlightColor}
            useInViewOptions={inViewOptions}
            direction="ttb"
          >
            functional, aesthetic and psychological effect
          </TextHighlighter>{" "}
          of printed matter.
        </p>
      </div>
    </div>
  );
}
