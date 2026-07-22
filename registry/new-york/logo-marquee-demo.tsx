"use client";

import { LogoMarquee } from "./logo-marquee";
import type { Logo } from "./logo-marquee";

const logos: Logo[] = [
  {
    alt: "Vercel",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg",
  },
  {
    alt: "Next.js",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nextdotjs.svg",
  },
  {
    alt: "React",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg",
  },
  {
    alt: "TypeScript",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/typescript.svg",
  },
  {
    alt: "Tailwind CSS",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tailwindcss.svg",
  },
  {
    alt: "GitHub",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg",
  },
  {
    alt: "Figma",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/figma.svg",
  },
  {
    alt: "GitLab",
    src: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gitlab.svg",
  },
];

export const LogoMarqueePreview = function LogoMarqueePreview() {
  return (
    <div className="flex w-full items-center justify-center">
      <LogoMarquee logos={logos} />
    </div>
  );
};
