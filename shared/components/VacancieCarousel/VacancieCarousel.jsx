"use client";

import { useRef, useEffect, useState } from "react";
import { Card } from "../Card/Card"; // імпортуємо Card
import { Button } from "../Button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./VacancieCarousel.module.css";
import Container from "../Container/Container";

const vacancies = [
  {
    id: 1,
    title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
    image: "/images/scout1.jpg",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
  {
    id: 2,
    title: "Діловод відділення персоналу",
    image: "/images/clerk.webp",
    unit: "66 ОМБр ім. князя Мстислава Хороброго",
  },
  {
    id: 3,
    title: "Розвідник-далекомірник, військовослужбовець у ЗСУ",
    image: "/images/scout2.jpg",
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
];

export default function VacancyCarousel() {
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false); // Додаємо стейт для контролю прокрутки

  useEffect(() => {
    if (cardRefs.current[0]) {
      setScrollAmount(cardRefs.current[0].getBoundingClientRect().width); // Визначаємо ширину першої картки
    }
  }, []);

  const scroll = (offset) => {
    if (isScrolling) return; // Якщо прокрутка вже йде, не дозволяємо натискати знову

    setIsScrolling(true);

    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }

    // Задаємо таймер для зняття блокування прокрутки через деякий час
    setTimeout(() => setIsScrolling(false), 600); // 600 мс — час прокрутки
  };

  return (
    <>
      <div className={styles.carouselContainer}>
        <ul className={styles.carouselWrapper} ref={carouselRef}>
          {vacancies.map((vacancy, index) => (
            <Card
              key={vacancy.id}
              vacancy={vacancy}
              ref={(el) => (cardRefs.current[index] = el)} // Збереження рефів для кожної картки
            />
          ))}
        </ul>
      </div>
      <Container>
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "32px" }}
        >
          <Button
            onClick={() => scroll(-scrollAmount)} // Прокрутка вліво
            className={styles.navButtonLeft}
          >
            <ChevronLeft />
          </Button>
          <div
            style={{ flex: 1, margin: "0 20px", borderTop: "4px dotted black" }}
          />
          <Button
            onClick={() => scroll(scrollAmount)} // Прокрутка вправо
            className={styles.navButtonRight}
          >
            <ChevronRight />
          </Button>
        </div>
      </Container>
    </>
  );
}
