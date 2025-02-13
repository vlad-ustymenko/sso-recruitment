"use client";

import { useRef, useEffect, useState, use } from "react";
import { Card } from "../Card/Card";
import { Button } from "../Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./VacancieCarousel.module.css";
import Container from "../Container/Container";
import Link from "next/link";
import { set } from "mongoose";

export default function VacancyCarousel({ vacanciesList }) {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollRef = useRef(null);
  const [step, setStep] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [measurement, setMeasurement] = useState(500);
  const [viewsCards, setViewsCards] = useState(1);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    setLineWidth(scrollRef.current.offsetWidth / vacanciesList.length);

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
    const cardWidth = cardRefs.current[0].offsetWidth;

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
        } else {
          carouselRef.current.scrollBy({
            left: cardWidth,
            behavior: "smooth",
          });
        }
      }
    }
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
          <div className={styles.scrollWrapper}>
            <Button
              onClick={() => {
                if (!isScrolling) {
                  scroll("left");
                  setIsScrolling(true);
                  setStep((prev) =>
                    prev === 0 ? vacanciesList.length - 1 : prev - 1
                  );
                  setTimeout(() => {
                    setIsScrolling(false);
                  }, 600);
                }
              }}
              arrow
              arrowDirection={"left"}
            >
              <ChevronLeft />
            </Button>
            <div className={styles.scroll} ref={scrollRef}>
              <span
                className={styles.line}
                style={{
                  position: "absolute",
                  top: "50%",
                  borderTop: "4px solid black",
                  width: `${lineWidth}px`,
                  transform: `translateX(${step * lineWidth}px)`,
                  transition: "all 0.3s ease",
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
              onClick={() => {
                if (!isScrolling) {
                  scroll("right");
                  setIsScrolling(true);
                  setStep((prev) =>
                    prev === vacanciesList.length - 1 ? 0 : prev + 1
                  );
                  setTimeout(() => {
                    setIsScrolling(false);
                  }, 600);
                }
              }}
              arrow
              arrowDirection={"right"}
            >
              <ChevronRight />
            </Button>
          </div>
          <Link href={"/vacancies"} className={styles.link}>
            Всі вакансії
            <ChevronRight />
          </Link>
        </div>
      </Container>
    </>
  );
}
