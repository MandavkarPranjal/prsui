"use client";

import Typewriter from "./typewriter";

export const TypewriterPreview = () => (
  <div className="flex flex-col items-center gap-2 text-center">
    <p className="text-3xl text-muted-foreground">To seek the truth we must</p>
    <p className="text-3xl font-medium text-foreground">
      <Typewriter
        as="span"
        text={[
          "question",
          "observe",
          "doubt",
          "discover",
          "keep looking upward",
        ]}
        speed={70}
        waitTime={1500}
        deleteSpeed={40}
        cursorChar={"_"}
      />
    </p>
  </div>
);
