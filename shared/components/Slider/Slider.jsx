"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css";

export default function Slider({
  step,
  setStep,
  value,
  setValue,
  setfrontDay,
}) {
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
        setfrontDay(e.target.value * 3333.33);
        return;
      }
      setStep(
        (prev) =>
          (prev = (sliderWidth.current.scrollWidth - 84) / 31) * e.target.value
      );
      setValue(e.target.value);

      setfrontDay(e.target.value * 3333.33);
    }
  };

  return (
    <div className={styles.sliderContainer} ref={sliderWidth}>
      <label htmlFor="slider"></label>
      <input
        id="slider"
        type="range"
        min="0"
        max="31"
        value={value}
        onChange={handleChange}
        className={styles.slider}
        aria-label="Кількість днів на бойових"
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
