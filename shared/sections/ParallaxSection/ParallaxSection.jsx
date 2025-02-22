"use client";

import { Parallax } from "react-parallax";
import styles from "./ParallaxSection.module.css";

export default function ParallaxSection() {
  return (
    <Parallax
      bgImage="/images/parallax.webp"
      strength={100}
      className={styles.parallax}
    >
      <div className={styles.parallaxContent}></div>
    </Parallax>
  );
}
