"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalCarousel.module.css";

const items = [
  "/images/solder1.png",
  "/images/solder2.png",
  "/images/solder3.png",
  "/images/solder2.png",
  "/images/solder1.png",
];

export default function HorizontalCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const positions = [
    { scale: 0.6, x: -200, opacity: 0.3, zIndex: 1 }, // Праворуч (найближче)
    { scale: 0.8, x: -100, opacity: 0.6, zIndex: 2 }, // Центр
    { scale: 1, x: 0, opacity: 1, zIndex: 3 }, // Ліворуч
    { scale: 0.8, x: 100, opacity: 0.3, zIndex: 2 }, // Дальній лівий
    { scale: 0.6, x: 200, opacity: 0.6, zIndex: 1 }, // Дальній лівий
  ];

  return (
    <div className={styles.carousel}>
      {items.map((src, i) => {
        const posIndex = (i - index + items.length) % items.length;
        const { scale, x, opacity, zIndex } = positions[posIndex];

        return (
          <motion.img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={styles.image}
            style={{ zIndex }}
            animate={{ opacity, x, scale }} // Замінили `y` на `x`
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
