"use client";

import { useTheme } from "next-themes";

import { LineShadowText } from "@/registry/new-york/line-shadow-text";

export const LineShadowTextDemo = () => {
  const theme = useTheme();
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black";
  return (
    <h1 className="text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
      Think
      <LineShadowText className="italic" shadowColor={shadowColor}>
        Fast
      </LineShadowText>
    </h1>
  );
};
