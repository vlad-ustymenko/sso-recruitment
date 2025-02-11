"use client"; // якщо Next.js 13+ з app router

import { Parallax } from "react-parallax";
import styles from "./ParallaxSection.module.css";

export default function ParallaxSection() {
  return (
    <Parallax
      bgImage="/images/parallax.png" // Замініть на ваш шлях до зображення
      strength={200} // Сила паралаксу (чим більше, тим сильніший ефект)
      className={styles.parallax}
    >
      <div className={styles.parallaxContent}></div>
    </Parallax>
  );
}
