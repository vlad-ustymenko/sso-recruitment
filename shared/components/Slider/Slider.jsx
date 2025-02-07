"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css";

export default function Slider() {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sliderWidth = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--value", (value / 31) * 100);
  }, [value]);

  const handleChange = (e) => {
    if (sliderWidth.current) {
      if (isMobile) {
        setStep(
          (prev) =>
            (prev = (sliderWidth.current.scrollWidth - 40) / 31) *
            e.target.value
        );
        setValue(e.target.value);
        return;
      }
      setStep(
        (prev) =>
          (prev = (sliderWidth.current.scrollWidth - 84) / 31) * e.target.value
      );
      setValue(e.target.value);
    }
  };

  return (
    <div className={styles.sliderContainer} ref={sliderWidth}>
      <input
        type="range"
        min="0"
        max="31"
        value={value}
        onChange={handleChange}
        className={styles.slider}
      />
      <span className={styles.sliderBackground}></span>
      <div
        className={styles.sliderLine}
        style={{ left: isMobile ? `${step + 20}px` : `${step + 42}px` }}
      ></div>
      <p
        className={styles.sliderText}
        style={{ left: isMobile ? `${step + 15}px` : `${step + 35}px` }}
      >
        {value}
      </p>
    </div>
  );
}
