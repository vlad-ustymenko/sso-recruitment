"use client";

import { useRef, useEffect, useState, use } from "react";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./VacancieCarousel.module.css";
import Container from "../Container/Container";

export default function VacancyCarousel({ vacanciesList }) {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [measurement, setMeasurement] = useState(500);
  const [viewsCards, setViewsCards] = useState(1);

  useEffect(() => {
    const screen = window.innerWidth;

    if (screen > 450 && screen <= 768) {
      setMeasurement(1200);
    }
    if (screen >= 769 && screen <= 1280) {
      setMeasurement(700);
      setViewsCards(2);
    }
    if (screen >= 1280) {
      setMeasurement(700);
      setViewsCards(3);
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft =
        cardRefs.current[0].offsetWidth * viewsCards;
    }
  }, [viewsCards]);

  const scroll = (direction) => {
    if (isScrolling) return; // Якщо прокрутка вже йде, не дозволяємо натискати знову
    const cardWidth = cardRefs.current[0].offsetWidth;
    setIsScrolling(true);

    if (carouselRef.current) {
      if (direction === "left") {
        if (carouselRef.current.scrollLeft < cardWidth + 100) {
          carouselRef.current.scrollBy({
            left: -cardWidth,
            behavior: "smooth",
          });

          setTimeout(
            () =>
              (carouselRef.current.scrollLeft =
                cardWidth * vacanciesList.length),
            600
          );
        } else {
          carouselRef.current.scrollBy({
            left: -cardWidth,
            behavior: "smooth",
          });
        }
      } else {
        if (
          Math.ceil(carouselRef.current.scrollLeft) >
          carouselRef.current.scrollWidth - measurement - cardWidth * viewsCards
        ) {
          carouselRef.current.scrollBy({
            left: cardWidth,
            behavior: "smooth",
          });

          setTimeout(
            () => (carouselRef.current.scrollLeft = cardWidth * viewsCards),
            600
          );
          console.log("finish");
        } else {
          carouselRef.current.scrollBy({
            left: cardWidth,
            behavior: "smooth",
          });
        }
      }
    }

    // Задаємо таймер для зняття блокування прокрутки через деякий час
    setTimeout(() => setIsScrolling(false), 600); // 600 мс — час прокрутки
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <ul className={styles.carouselWrapper} ref={carouselRef}>
          {[
            ...vacanciesList.slice(-viewsCards),
            ...vacanciesList,
            ...vacanciesList.slice(0, viewsCards),
          ].map((vacancie, index) => (
            <Card
              key={`${vacancie.image} + ${index}`}
              vacancie={vacancie}
              ref={(el) => (cardRefs.current[index] = el)} // Збереження рефів для кожної картки
            />
          ))}
        </ul>
      </div>
      <Container>
        <div className={styles.scrollContainer}>
          <Button
            onClick={() => scroll("left")} // Прокрутка вліво
            arrow
            arrowDirection={"left"}
          >
            <ChevronLeft />
          </Button>
          <div className={styles.scrollWrapper}>
            <span
              style={{
                position: "absolute",
                top: "50%",
                borderTop: "4px solid black",
              }}
            />

            <span
              style={{
                position: "absolute",
                top: "50%",

                width: "100%",
                borderTop: "4px dotted black",
              }}
            />
          </div>
          <Button
            onClick={() => scroll("right")} // Прокрутка вправо
            arrow
            arrowDirection={"right"}
          >
            <ChevronRight />
          </Button>
        </div>
      </Container>
    </>
  );
}
