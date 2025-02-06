"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalCarousel.module.css";

const items = [
  "/images/solder1.png",
  "/images/solder2.png",
  "/images/solder3.png",
  "/images/scout1.jpg",
  "/images/scout2.jpg",
];

export default function VerticalCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const positions = [
    { scale: 0.6, y: -40, opacity: 1, zIndex: 1 }, // Верхній маленький
    { scale: 0.8, y: 40, opacity: 1, zIndex: 2 }, // Верхній середній
    { scale: 1, y: 160, opacity: 1, zIndex: 5 }, // Центральний (найвище)
    { scale: 0.8, y: 160, opacity: 0.5, zIndex: 2 }, // Нижній середній
    { scale: 0.6, y: 160, opacity: 0.2, zIndex: 1 }, // Нижній маленький
  ];

  return (
    <div className={styles.carousel}>
      {items.map((src, i) => {
        const posIndex = (i - index + items.length) % items.length; // Обчислюємо позицію в 3D ефекті
        const { scale, y, opacity, zIndex } = positions[posIndex];

        return (
          <motion.img
            key={i}
            src={src}
            alt={`Slide ${i + 1}`}
            className={styles.image}
            style={{ zIndex: items.length - posIndex }}
            animate={{ opacity, y, scale, zIndex }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
