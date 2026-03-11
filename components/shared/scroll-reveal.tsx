"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = {
  as?: "article" | "div" | "li" | "section" | "span";
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
  once?: boolean;
};

const motionComponents = {
  article: motion.article,
  div: motion.div,
  li: motion.li,
  section: motion.section,
  span: motion.span,
};

function getHiddenState(direction: ScrollRevealProps["direction"], distance: number) {
  switch (direction) {
    case "down":
      return { opacity: 0, y: -distance, filter: "blur(10px)" };
    case "left":
      return { opacity: 0, x: -distance, filter: "blur(10px)" };
    case "right":
      return { opacity: 0, x: distance, filter: "blur(10px)" };
    case "scale":
      return { opacity: 0, scale: 0.94, filter: "blur(10px)" };
    case "up":
    default:
      return { opacity: 0, y: distance, filter: "blur(10px)" };
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
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = motionComponents[as];

  if (prefersReducedMotion) {
    return <MotionComponent className={className}>{children}</MotionComponent>;
  }

  return (
    <MotionComponent
      className={className}
      initial={getHiddenState(direction, distance)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
}
