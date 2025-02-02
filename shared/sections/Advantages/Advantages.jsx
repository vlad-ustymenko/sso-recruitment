"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Advantages.module.css";
import Container from "@/shared/components/Container/Container";
import AdvantagesCard from "@/shared/components/AdvantagesCard/AdvantagesCard";

const Advantages = () => {
  const cards = [1, 2, 3, 4, 5, 6];
  const [count, setCount] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          setIsHorizontal(true);

          // **Зупиняємо інерцію прокрутки**
          document.documentElement.style.overflow = "hidden";
          document.body.style.overflow = "hidden";

          // Примусово зафіксуємо `scrollY`
          window.scrollTo({
            top: window.scrollY,
            behavior: "instant",
          });

          const handleScroll = (e) => {
            e.preventDefault();
            const delta = e.deltaY;

            setCount((prevCount) => {
              let newCount = prevCount + delta;

              // Якщо прокручено більше ніж ширина контейнера, зупиняємо прокрутку
              if (containerRef.current) {
                if (
                  newCount >=
                  containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth +
                    90
                ) {
                  newCount =
                    containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth +
                    92;
                  document.documentElement.style.overflow = "";
                  document.body.style.overflow = "";
                  window.removeEventListener("wheel", handleScroll);
                }

                // Якщо count менше нуля, зупиняємо прокрутку
                if (newCount < 0) {
                  document.documentElement.style.overflow = "";
                  document.body.style.overflow = "";
                  window.removeEventListener("wheel", handleScroll);
                  return 0;
                }
              }

              return newCount;
            });
          };

          // Додаємо слухач подій на wheel
          window.addEventListener("wheel", handleScroll, { passive: false });

          // Очищаємо слухач події при розмонтуванні
          return () => {
            window.removeEventListener("wheel", handleScroll);
          };
        }
      },
      {
        threshold: 1, // Блок буде активований, коли 100% його висоти буде в центрі екрану
      }
    );

    observer.observe(section);

    // Очищаємо observer при розмонтуванні компонента
    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <Container>
      <h2 className={styles.title}>Переваги служби в ССО</h2>
      <div className={styles.container} ref={sectionRef}>
        <div
          className={styles.wrapper}
          ref={containerRef} // Прикріплюємо реф до контейнера
          style={{ transform: `translateX(-${count}px)` }}
        >
          {cards.map((card) => (
            <AdvantagesCard key={card} />
          ))}
        </div>
      </div>
      <div className={styles.test}></div>
    </Container>
  );
};

export default Advantages;
