"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import styles from "./BeforeAfter.module.css"; // Імпортуємо стилі

const BeforeAfter = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(100); // Стартова позиція
  const isDraggingRef = useRef(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    // Функція оновлення позиції слайдера
    const updateSliderPosition = (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
    };

    // Обробник руху миші по всьому екрану
    const handleMouseMove = (e) => {
      if (isDraggingRef.current) updateSliderPosition(e.clientX);
    };

    // Обробник руху пальцем по всьому екрану
    const handleTouchMove = (e) => {
      if (isDraggingRef.current) updateSliderPosition(e.touches[0].clientX);
    };

    // Почати перетягування
    const startDragging = () => (isDraggingRef.current = true);

    // Завершити перетягування
    const stopDragging = () => (isDraggingRef.current = false);

    // Додаємо глобальні слухачі подій
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        "--opacity": sliderPosition > 0 ? 1 - (sliderPosition - 5) / 50 : 1,
      }}
    >
      <div className={styles.imageWrapper}>
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

        {/* Дівайдер */}
        <div
          className={styles.divider}
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={() => (isDraggingRef.current = true)}
          onTouchStart={() => (isDraggingRef.current = true)}
        >
          <ChevronLeft className={styles.arrowLeft} width={32} height={32} />
          <ChevronRight className={styles.arrowRight} width={32} height={32} />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
