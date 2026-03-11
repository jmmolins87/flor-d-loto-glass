"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { createElement } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  as?: "article" | "div" | "li" | "section" | "span";
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
  once?: boolean;
};

function getTransform(direction: ScrollRevealProps["direction"], distance: number) {
  switch (direction) {
    case "down":
      return `translate3d(0, -${distance}px, 0)`;
    case "left":
      return `translate3d(-${distance}px, 0, 0)`;
    case "right":
      return `translate3d(${distance}px, 0, 0)`;
    case "scale":
      return "scale(0.94)";
    case "up":
    default:
      return `translate3d(0, ${distance}px, 0)`;
  }
}

export function ScrollReveal({
  as = "div",
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 32,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, prefersReducedMotion]);

  const Component = as;
  const style: CSSProperties = prefersReducedMotion
    ? {}
    : {
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : "blur(10px)",
        transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : getTransform(direction, distance),
        transitionDelay: `${delay}ms`,
        transitionDuration: "800ms",
        transitionProperty: "opacity, transform, filter",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform, filter",
      };

  return createElement(
    Component,
    {
      ref: (node: HTMLElement | null) => {
        ref.current = node;
      },
      className: cn(className),
      style,
    },
    children,
  );
}
