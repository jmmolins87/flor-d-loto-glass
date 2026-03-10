"use client";

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
};

export function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[] | PortableTextBlock | null | undefined;
}) {
  if (!value) {
    return null;
  }

  return (
    <div className="rich-text">
      <PortableText components={components} value={value} />
    </div>
  );
}
