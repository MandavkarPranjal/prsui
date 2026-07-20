"use client";

import React from "react";

import { cn } from "@/lib/utils";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: React.ReactNode;
};

const DefaultIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const Link01 = ({ children, className, icon, ...props }: LinkProps) => (
  <a
    target="_blank"
    className={cn(
      "group/link relative flex items-center",
      "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
      "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
      "hover:before:origin-left hover:before:scale-x-100",
      className
    )}
    {...props}
  >
    {children}
    {icon ?? (
      <DefaultIcon className="ml-[0.3em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover/link:translate-y-0 group-hover/link:opacity-100 motion-reduce:transition-none" />
    )}
  </a>
);

const Link02 = ({ children, className, icon, ...props }: LinkProps) => (
  <a
    className={cn(
      "group/link relative flex items-center",
      className,
      "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
      "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
      "before:origin-left",
      "hover:before:origin-right hover:before:scale-x-100"
    )}
    {...props}
  >
    {children}
    {icon ?? (
      <DefaultIcon className="ml-[0.3em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover/link:translate-y-0 group-hover/link:opacity-100 motion-reduce:transition-none" />
    )}
  </a>
);

const Link03 = ({ children, className, icon, ...props }: LinkProps) => (
  <a
    className={cn(
      "group/link relative flex items-center",
      className,
      "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
      "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
      "before:origin-center",
      "hover:before:scale-x-100"
    )}
    {...props}
  >
    {children}
    {icon ?? (
      <DefaultIcon className="ml-[0.3em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover/link:translate-y-0 group-hover/link:opacity-100 motion-reduce:transition-none" />
    )}
  </a>
);

const Link04 = ({ children, className, icon, ...props }: LinkProps) => (
  <a
    className={cn(
      "group/link relative flex items-center",
      className,
      "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
      "before:origin-right before:scale-x-0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
      "before:origin-center md:before:bottom-0",
      "before:z-1 px-2 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-[1.4em]"
    )}
    {...props}
  >
    {children}
    {icon ?? (
      <DefaultIcon className="z-0 ml-[0.6em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover/link:translate-y-0 group-hover/link:rotate-45 group-hover/link:opacity-100 motion-reduce:transition-none" />
    )}
  </a>
);

const Link05 = ({ children, className, icon, ...props }: LinkProps) => (
  <a
    className={cn(
      className,
      "group/link relative flex items-center",
      "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
      "before:scale-x-1 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
      "before:origin-left md:before:top-0",
      "before:z-1 px-2 before:h-full before:scale-x-0 before:mix-blend-difference hover:before:scale-x-100"
    )}
    {...props}
  >
    {children}
    {icon ?? (
      <DefaultIcon className="z-0 ml-[0.6em] mt-[0em] size-[0.55em] -translate-x-1 rotate-45 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover/link:translate-x-0 group-hover/link:opacity-100 motion-reduce:transition-none" />
    )}
  </a>
);

export { Link01, Link02, Link03, Link04, Link05 };
export type { LinkProps };
