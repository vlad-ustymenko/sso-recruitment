"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./VerticalCarousel.module.css";

const items = [
  "/images/01.webp",
  "/images/02.webp",
  "/images/03.webp",
  "/images/04.webp",
  "/images/05.webp",
  "/images/06.webp",
  "/images/07.webp",
  "/images/08.webp",
  "/images/09.webp",
];

export default function HorizontalCarousel() {
  const [index, setIndex] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => setViewWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const positions = useMemo(() => {
    const configs = {
      mobile: [
        { scale: 0.2, x: -160, opacity: 0.1, zIndex: 1 },
        { scale: 0.4, x: -120, opacity: 0.2, zIndex: 2 },
        { scale: 0.6, x: -80, opacity: 0.3, zIndex: 3 },
        { scale: 0.8, x: -40, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 40, opacity: 0.6, zIndex: 4 },
        { scale: 0.6, x: 80, opacity: 0.3, zIndex: 3 },
        { scale: 0.4, x: 120, opacity: 0.2, zIndex: 2 },
        { scale: 0.2, x: 160, opacity: 0.1, zIndex: 1 },
      ],
      desktop: [
        { scale: 0.2, x: -1000, opacity: 0.1, zIndex: 1 },
        { scale: 0.4, x: -750, opacity: 0.2, zIndex: 2 },
        { scale: 0.6, x: -500, opacity: 0.3, zIndex: 3 },
        { scale: 0.8, x: -250, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 250, opacity: 0.6, zIndex: 4 },
        { scale: 0.6, x: 500, opacity: 0.3, zIndex: 3 },
        { scale: 0.4, x: 750, opacity: 0.2, zIndex: 2 },
        { scale: 0.2, x: 1000, opacity: 0.1, zIndex: 1 },
      ],
      tablet: [
        { scale: 0.2, x: -500, opacity: 0.1, zIndex: 1 },
        { scale: 0.4, x: -400, opacity: 0.2, zIndex: 2 },
        { scale: 0.6, x: -300, opacity: 0.3, zIndex: 3 },
        { scale: 0.8, x: -200, opacity: 0.6, zIndex: 4 },
        { scale: 1, x: 0, opacity: 1, zIndex: 5 },
        { scale: 0.8, x: 200, opacity: 0.6, zIndex: 4 },
        { scale: 0.6, x: 300, opacity: 0.3, zIndex: 3 },
        { scale: 0.4, x: 400, opacity: 0.2, zIndex: 2 },
        { scale: 0.2, x: 500, opacity: 0.1, zIndex: 1 },
      ],
    };
    return viewWidth < 768
      ? configs.mobile
      : viewWidth > 1919
      ? configs.desktop
      : configs.tablet;
  }, [viewWidth]);

  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % items.length);
      }, 3000);
    };

    startInterval();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalRef.current);
      } else {
        startInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getPosition = useCallback(
    (i) => (i - index + items.length) % items.length,
    [index]
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
            loading="lazy"
          />
        );
      })}
    </div>
  );
}
