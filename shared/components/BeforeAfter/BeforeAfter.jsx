"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import styles from "./BeforeAfter.module.css";
import { Button } from "../Button/Button";
import Menu from "@/shared/components/Menu/Menu";
import Modal from "../Modal/Modal";
import { useModalContext } from "../../../context/ModalContext";

const BeforeAfter = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(100);
  const isDraggingRef = useRef(false);
  const containerRef = useRef(null);
  const { activeFormModal, setActiveFormModal } = useModalContext();

  useEffect(() => {
    const animation = setInterval(() => {
      setSliderPosition((prev) => {
        if (prev <= 55) {
          clearInterval(animation);
          return 55;
        }
        return prev - 1;
      });
    }, 10);

    return () => clearInterval(animation);
  }, []);

  useEffect(() => {
    const updateSliderPosition = (clientX) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = ((clientX - rect.left) / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
    };

    const handleMouseMove = (e) => {
      if (isDraggingRef.current) updateSliderPosition(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (isDraggingRef.current) updateSliderPosition(e.touches[0].clientX);
    };

    const startDragging = () => (isDraggingRef.current = true);

    const stopDragging = () => (isDraggingRef.current = false);

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

  const handleMouseDown = (event) => {
    const target = event.target;
    const after = window.getComputedStyle(target, "::after").content;

    if (after !== "none" && after !== "") return;

    isDraggingRef.current = true;
  };

  const handleTouchStart = (event) => {
    const target = event.target;
    const after = window.getComputedStyle(target, "::after").content;

    if (after !== "none" && after !== "") return;

    isDraggingRef.current = true;
  };

  return (
    <>
      <div
        ref={containerRef}
        className={styles.container}
        style={{
          "--opacity": sliderPosition > 0 ? 1 - (sliderPosition - 5) / 50 : 1,
        }}
      >
        <h1 className={styles.title}>
          ССО
          <br /> Рекрутинг
        </h1>
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
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <ChevronLeft className={styles.arrowLeft} width={32} height={32} />
            <ChevronRight
              className={styles.arrowRight}
              width={32}
              height={32}
            />
          </div>
          <Button
            className={styles.button}
            title="Знайди свою зграю"
            logo
            onClick={() => {
              setActiveFormModal(true);
            }}
          />
        </div>
      </div>
      <Menu />
      <Modal isFormModal vacancy="main" />
    </>
  );
};

export default BeforeAfter;
