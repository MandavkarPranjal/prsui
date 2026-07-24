import { TextAnnotation as Highlighter } from "@/registry/new-york/text-annotation";

export const HighlighterDemo = function HighlighterDemo() {
  return (
    <div className="text leading-normal space-y-4 font-overusedGrotesk ">
      <p className="whitespace-break-spaces">
        The most memorable software isn't defined by the number of features it
        offers, but by{" "}
        <Highlighter
          action="highlight"
          color="#f6339a"
          strokeWidth={1.5}
          animationDuration={600}
          iterations={2}
          padding={2}
          multiline={true}
        >
          how naturally it fits into people's lives.
        </Highlighter>
      </p>
      <p className="whitespace-break-spaces">
        Every thoughtful{" "}
        <Highlighter
          action="underline"
          color="#f6339a"
          strokeWidth={1.5}
          animationDuration={600}
          iterations={2}
          padding={2}
          multiline={true}
        >
          interaction, subtle animation, and carefully
        </Highlighter>{" "}
        chosen word contributes to an experience that feels intuitive rather
        than overwhelming.
      </p>
    </div>
  );
};
