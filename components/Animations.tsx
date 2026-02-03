"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, delay = 0, duration = 0.5 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
}

export function ScaleIn({ children, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
}

export function SlideIn({ children, direction = "left", delay = 0 }: SlideInProps) {
  const directionVariants = {
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    up: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  };

  const variant = directionVariants[direction];

  return (
    <motion.div
      initial={variant.initial}
      whileInView={variant.animate}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
}

export function HoverScale({ children, scale = 1.05 }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {children}
    </motion.div>
  );
}

interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
}

export function Floating({ children, duration = 3 }: FloatingProps) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  delay?: number;
}

export function StaggerContainer({ children, delay = 0 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={staggerItem}>{children}</motion.div>;
}
