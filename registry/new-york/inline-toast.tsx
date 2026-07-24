"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import type { FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

export interface InlineCopyToastProps {
  code: string;
  copyDuration?: number;
}

export const InlineToast: FC<InlineCopyToastProps> = ({
  code,
  copyDuration = 2000,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, copyDuration);
  };

  return (
    <motion.div
      layout="position"
      transition={{ damping: 24, stiffness: 260, type: "spring" }}
      className="relative flex h-16 min-w-[320px] items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 pl-7 pr-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: copyDuration / 1000,
              ease: "linear",
            }}
            className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800"
          />
        )}
      </AnimatePresence>

      <div className="z-10 flex w-full items-center justify-between gap-7">
        <AnimatePresence mode="popLayout">
          {copied ? (
            <motion.div
              key="copied"
              initial={{ filter: "blur(4px)", opacity: 0, scale: 1.1 }}
              animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              exit={{ filter: "blur(4px)", opacity: 0, scale: 1.1 }}
              transition={{
                bounce: 0,
                duration: 0.4,
                type: "spring",
              }}
              className="flex w-full items-center justify-center gap-2 text-black dark:text-white"
            >
              <IoCheckmarkCircle size={28} />
              <span className="text-lg font-bold">Code Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ filter: "blur(4px)", opacity: 0, scale: 0.95 }}
              animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              exit={{ filter: "blur(4px)", opacity: 0, scale: 0.95 }}
              transition={{
                bounce: 0,
                duration: 0.4,
                type: "spring",
              }}
              className="flex w-full items-center justify-between"
            >
              <span className="text-xl font-bold tracking-wide text-zinc-500 dark:text-zinc-400">
                {code}
              </span>

              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{
                  damping: 18,
                  stiffness: 350,
                  type: "spring",
                }}
                className="relative cursor-pointer overflow-hidden rounded-full bg-white px-[26px] py-2.5 text-base font-semibold text-zinc-900 shadow-[0_6px_12px_rgba(0,0,0,0.08)] dark:bg-zinc-100 dark:text-zinc-900"
              >
                <motion.span
                  initial={{ x: "-120%" }}
                  whileHover={{ x: "120%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent"
                />

                <span className="relative z-10">Copy</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InlineToast;
