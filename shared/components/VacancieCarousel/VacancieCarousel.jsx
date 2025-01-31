"use client";

import { useRef, useEffect, useState, use } from "react";
import { Card } from "../Card/Card"; // імпортуємо Card
import { Button } from "../Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./VacancieCarousel.module.css";
import Container from "../Container/Container";

const vacancies = [
  {
    id: 1,
    title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
    image: "/images/solder1.png",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
  {
    id: 2,
    title: "Діловод відділення персоналу",
    image: "/images/solder2.png",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
  {
    id: 3,
    title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
    image: "/images/solder3.png",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
  {
    id: 4,
    title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
    image: "/images/scout1.jpg",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
  {
    id: 5,
    title: "Діловод відділення персоналу",
    image: "/images/clerk.webp",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
  {
    id: 6,
    title: "Діловод відділення персоналу",
    image: "/images/scout2.jpg",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
];

export default function VacancyCarousel() {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: cardRefs.current[0]?.getBoundingClientRect().width * 3,
      });
    }
  }, []);

  const scroll = (direction) => {
    if (isScrolling) return; // Якщо прокрутка вже йде, не дозволяємо натискати знову
    const cardWidth = cardRefs.current[0]?.getBoundingClientRect().width;
    setIsScrolling(true);

    if (carouselRef.current) {
      if (direction === "left") {
        if (carouselRef.current.scrollLeft < cardWidth) {
          carouselRef.current.scrollBy({
            left: -cardWidth,
            behavior: "smooth",
          });

          setTimeout(
            () =>
              (carouselRef.current.scrollLeft =
                carouselRef.current.scrollWidth -
                2 * carouselRef.current.offsetWidth),
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
          Math.ceil(carouselRef.current.scrollLeft) <
          carouselRef.current.scrollWidth -
            carouselRef.current.offsetWidth -
            500
        ) {
          carouselRef.current.scrollBy({
            left: cardWidth,
            behavior: "smooth",
          });

          setTimeout(
            () =>
              (carouselRef.current.scrollLeft =
                carouselRef.current.offsetWidth),
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

    // Задаємо таймер для зняття блокування прокрутки через деякий час
    setTimeout(() => setIsScrolling(false), 600); // 600 мс — час прокрутки
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <ul className={styles.carouselWrapper} ref={carouselRef}>
          {[...vacancies.slice(-3), ...vacancies, ...vacancies.slice(0, 3)].map(
            (vacancy, index) => (
              <Card
                key={`${vacancy.image} + ${index}`}
                vacancy={vacancy}
                ref={(el) => (cardRefs.current[index] = el)} // Збереження рефів для кожної картки
              />
            )
          )}
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
