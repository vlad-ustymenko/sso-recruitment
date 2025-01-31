"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import styles from "./BeforeAfter.module.css"; // Імпортуємо стилі

const BeforeAfter = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(100); // Початково 100%
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Анімація з правого боку до середини
    const animation = setInterval(() => {
      setSliderPosition((prev) => {
        if (prev <= 55) {
          clearInterval(animation);
          return 55;
        }
        return prev - 1; // Зменшуємо позицію до 50
      });
    }, 10);

    return () => clearInterval(animation); // Очистка інтервалу після завершення
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  const handleTouchMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const touch = e.touches[0];
    const newPosition = ((touch.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <div
      className={styles.container}
      style={{
        "--opacity": sliderPosition > 0 ? 1 - (sliderPosition - 5) / 50 : 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div className={styles.imageWrapper} onMouseDown={handleMouseDown}>
        {/* After Image */}
        <div
          className={styles.afterImage}
          style={{ backgroundImage: `url(${afterImage})` }}
        ></div>
        {/* Before Image */}
        <div
          className={styles.beforeImage}
          style={{
            backgroundImage: `url(${beforeImage})`,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        ></div>
        {/* Divider */}
        <div
          className={styles.divider}
          style={{
            left: `${sliderPosition}%`,
          }}
          onMouseDown={handleMouseDown}
        >
          <ChevronLeft className={styles.arrowLeft} width={32} height={32} />
          <ChevronRight className={styles.arrowRight} width={32} height={32} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
