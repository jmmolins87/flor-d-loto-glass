import { StoryblokServerRichText } from "@storyblok/react/rsc";

import type { RichTextNode, RichTextValue } from "@/lib/cms/types";

function textFromChildren(children: unknown) {
  if (!Array.isArray(children)) {
    return "";
  }

  return children
    .map((child) => (typeof (child as RichTextNode)?.text === "string" ? (child as RichTextNode).text : ""))
    .join("");
}

function LegacyRichText({ value }: { value: RichTextNode[] }) {
  return (
    <div className="rich-text">
      {value.map((block, index) => {
        const style = typeof block.style === "string" ? block.style : "normal";
        const text = textFromChildren(block.children);

        if (!text) {
          return null;
        }

        if (style === "h3") {
          return <h3 key={`${style}-${index}`}>{text}</h3>;
        }

        return <p key={`${style}-${index}`}>{text}</p>;
      })}
    </div>
  );
}

export function PortableTextContent({
  value,
}: {
  value: RichTextValue | null | undefined;
}) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return <LegacyRichText value={value} />;
  }

  if (typeof value === "object" && value && value.type === "doc") {
    return (
      <div className="rich-text">
        <StoryblokServerRichText
          doc={value as unknown as Parameters<typeof StoryblokServerRichText>[0]["doc"]}
        />
      </div>
    );
  }

  return null;
}
