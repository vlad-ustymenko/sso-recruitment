"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalCarousel.module.css";

const items = [
  "/images/01.jpg",
  "/images/02.jpeg",
  "/images/03.jpeg",
  "/images/04.jpeg",
  "/images/05.jpeg",
];

export default function HorizontalCarousel() {
  const [index, setIndex] = useState(0);
  const [viewWidth, setViewWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const updateWidth = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [viewWidth]);

  const positions = useMemo(() => {
    return viewWidth < 768
      ? [
          { scale: 0.6, x: -100, opacity: 0.3, zIndex: 1 },
          { scale: 0.8, x: -50, opacity: 0.6, zIndex: 2 },
          { scale: 1, x: 0, opacity: 1, zIndex: 3 },
          { scale: 0.8, x: 50, opacity: 0.6, zIndex: 2 },
          { scale: 0.6, x: 100, opacity: 0.3, zIndex: 1 },
        ]
      : viewWidth > 1919
      ? [
          { scale: 0.6, x: -500, opacity: 0.3, zIndex: 1 },
          { scale: 0.8, x: -250, opacity: 0.6, zIndex: 2 },
          { scale: 1, x: 0, opacity: 1, zIndex: 3 },
          { scale: 0.8, x: 250, opacity: 0.6, zIndex: 2 },
          { scale: 0.6, x: 500, opacity: 0.3, zIndex: 1 },
        ]
      : [
          { scale: 0.6, x: -300, opacity: 0.3, zIndex: 1 },
          { scale: 0.8, x: -200, opacity: 0.6, zIndex: 2 },
          { scale: 1, x: 0, opacity: 1, zIndex: 3 },
          { scale: 0.8, x: 200, opacity: 0.6, zIndex: 2 },
          { scale: 0.6, x: 300, opacity: 0.3, zIndex: 1 },
        ];
  }, [viewWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getPosition = useCallback(
    (i) => {
      return (i - index + items.length) % items.length;
    },
    [index, items.length]
  );

  return (
    <div className={styles.carousel}>
      {items.map((src, i) => {
        const posIndex = getPosition(i);
        const { scale, x, opacity, zIndex } = positions[posIndex];

        return (
          <motion.img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={styles.image}
            style={{ zIndex }}
            animate={{ opacity, x, scale }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
