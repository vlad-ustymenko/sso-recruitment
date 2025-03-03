"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import styles from "./BeforeAfter.module.css";
import { Button } from "../Button/Button";
import Menu from "@/shared/components/Menu/Menu";
import Modal from "../Modal/Modal";
import { useModalContext } from "../../../context/ModalContext";
import Image from "next/image";

const BeforeAfter = ({
  beforeImage,
  afterImage,
  beforeMobile,
  afterMobile,
}) => {
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

  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  }, []);

  useEffect(() => {
    const stopDragging = () => (isDraggingRef.current = false);
    window.addEventListener(
      "mousemove",
      (e) => isDraggingRef.current && updateSliderPosition(e.clientX)
    );
    window.addEventListener(
      "touchmove",
      (e) => isDraggingRef.current && updateSliderPosition(e.touches[0].clientX)
    );
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mousemove", updateSliderPosition);
      window.removeEventListener("touchmove", updateSliderPosition);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [updateSliderPosition]);

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
          "--opacityAfter":
            sliderPosition > 0 ? 1 - (sliderPosition - 5) / 50 : 1,
          "--opacityBefore":
            sliderPosition > 0 ? 0 + (sliderPosition - 5) / 50 : 0,
        }}
      >
        <h1 className={styles.title}>
          ССО
          <br /> Рекрутинг
        </h1>
        <div className={styles.imageWrapper}>
          <picture className={styles.afterImage}>
            <source srcSet={afterMobile} media="(max-width: 768px)" />
            <source srcSet={afterImage} media="(min-width: 769px)" />
            <Image
              src={afterImage}
              alt="After"
              fill
              quality={100}
              priority={true}
              style={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </picture>

          <picture
            className={styles.beforeImage}
            style={{
              clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            }}
          >
            <source srcSet={beforeMobile} media="(max-width: 768px)" />
            <source srcSet={beforeImage} media="(min-width: 769px)" />
            <Image
              src={beforeImage}
              alt="Before"
              fill
              quality={100}
              priority={true}
              style={{
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </picture>

          <div
            className={styles.divider}
            style={{ left: `${sliderPosition}%` }}
          >
            <ChevronLeft
              className={styles.arrowLeft}
              width={32}
              height={32}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            />
            <ChevronRight
              className={styles.arrowRight}
              width={32}
              height={32}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
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
