"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface ScrambleHoverProps {
  text: string;
  scrambleSpeed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
}

const ScrambleHover: React.FC<ScrambleHoverProps> = ({
  text,
  scrambleSpeed = 50,
  maxIterations = 10,
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className,
  scrambledClassName,
  sequential = false,
  revealDirection = "start",
  ...props
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const revealedIndicesRef = useRef(new Set<number>());

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let currentIteration = 0;
    const revealedIndices = revealedIndicesRef.current;

    const getNextIndex = () => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start": {
          return revealedIndices.size;
        }
        case "end": {
          return textLength - 1 - revealedIndices.size;
        }
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedIndices.size / 2);
          const nextIndex =
            revealedIndices.size % 2 === 0
              ? middle + offset
              : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedIndices.has(nextIndex)
          ) {
            return nextIndex;
          }

          for (let i = 0; i < textLength; i += 1) {
            if (!revealedIndices.has(i)) {
              return i;
            }
          }
          return 0;
        }
        default: {
          return revealedIndices.size;
        }
      }
    };

    const availableChars = useOriginalCharsOnly
      ? [...new Set(text)].filter((char) => char !== " ")
      : [...characters];

    const shuffleText = (input: string) => {
      if (useOriginalCharsOnly) {
        const positions = [...input].map((char, i) => ({
          char,
          index: i,
          isRevealed: revealedIndices.has(i),
          isSpace: char === " ",
        }));

        const nonSpaceChars = positions
          .filter((p) => !p.isSpace && !p.isRevealed)
          .map((p) => p.char);

        for (let i = nonSpaceChars.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [nonSpaceChars[i], nonSpaceChars[j]] = [
            nonSpaceChars[j],
            nonSpaceChars[i],
          ];
        }

        let charIndex = 0;
        return positions
          .map((p) => {
            if (p.isSpace) {
              return " ";
            }
            if (p.isRevealed) {
              return input[p.index];
            }
            const current = nonSpaceChars[charIndex];
            charIndex += 1;
            return current;
          })
          .join("");
      }
      return [...input]
        .map((char, i) => {
          if (char === " ") {
            return " ";
          }
          if (revealedIndices.has(i)) {
            return input[i];
          }
          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join("");
    };

    if (isHovering) {
      setIsScrambling(true);
      interval = setInterval(() => {
        if (sequential) {
          if (revealedIndices.size < text.length) {
            const nextIndex = getNextIndex();
            revealedIndices.add(nextIndex);
            setDisplayText(shuffleText(text));
          } else {
            clearInterval(interval);
            setIsScrambling(false);
          }
        } else {
          setDisplayText(shuffleText(text));
          currentIteration += 1;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setIsScrambling(false);
            setDisplayText(text);
          }
        }
      }, scrambleSpeed);
    } else {
      setDisplayText(text);
      revealedIndices.clear();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    isHovering,
    text,
    characters,
    scrambleSpeed,
    useOriginalCharsOnly,
    sequential,
    revealDirection,
    maxIterations,
  ]);

  return (
    <motion.span
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className={cn("inline-block whitespace-pre-wrap", className)}
      {...props}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {[...displayText].map((char, index) => (
          <span
            key={index}
            className={cn(
              revealedIndicesRef.current.has(index) ||
                !isScrambling ||
                !isHovering
                ? className
                : scrambledClassName
            )}
          >
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
};

export default ScrambleHover;
