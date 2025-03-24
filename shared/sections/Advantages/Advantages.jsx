"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Advantages.module.css";
import Container from "@/shared/components/Container/Container";
import AdvantagesCard from "@/shared/components/AdvantagesCard/AdvantagesCard";
import Calculator from "../Calculator/Calculator";

const Advantages = () => {
  const cards = [
    {
      title: "Людяний\n підхід",
      description:
        "Кваліфіковані командири дбають про своїх підлеглих, а принцип взаємопідтримки – основа  у підрозділі.",
      icon: "🤝",
    },
    ,
    {
      title: "Грошове\n забезпечення",
      description: "Грошове забезпечення в ССО на 30%  більше.",
      icon: "💵",
    },
    ,
    {
      title: "Військова\n підготовка",
      description:
        "ССО – це найвищий рівень підготовки. Інтенсивні тренування, бойова тактика, спецоперації та постійні навчання.",
      icon: "🪖",
    },
    ,
    {
      title: "Сучасне\n оснащення",
      description:
        "Передові технології, новітня зброя, розвідсистеми та екіпірування, які відповідають найвищим стандартам.",
      icon: "🔫",
    },
    {
      title: "Кар'єрне\n зростання",
      description:
        "Можливість розвиватися від солдата до офіцера, навчання за кордоном, спеціалізовані курси та перспективи після служби.",
      icon: "📈",
    },

    {
      title: "Зграя\n професіоналів",
      description:
        "ССО - це друга родина, яка прикриє твою спину і підтримає, коли ти будеш цього потребувати.",
      icon: "🐺",
    },
  ];

  const [scrollCount, setScrollCount] = useState(0);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.documentElement.style.overflow = "hidden";
          window.scrollTo({
            top: window.scrollY,
            behavior: "instant",
          });

          const handleScroll = (e) => {
            e.preventDefault();
            const delta = e.deltaY;

            setScrollCount((prevScrollCount) => {
              let newScrollCount = prevScrollCount + delta;

              if (containerRef.current) {
                if (
                  newScrollCount >=
                  containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth
                ) {
                  newScrollCount =
                    containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth;

                  document.documentElement.style.overflow = "";
                  window.removeEventListener("wheel", handleScroll);
                }

                if (newScrollCount < 0) {
                  document.documentElement.style.overflow = "";
                  window.removeEventListener("wheel", handleScroll);
                  return 0;
                }
              }

              return newScrollCount;
            });
          };

          const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientY;
          };

          const handleTouchMove = (e) => {
            const touchMoveX = touchStartX.current - e.touches[0].clientY;
            const delta = touchMoveX > 0 ? 30 : -30;

            setScrollCount((prevScrollCount) => {
              let newScrollCount = prevScrollCount + delta;

              if (newScrollCount <= 0) {
                document.documentElement.style.overflow = "";
                window.removeEventListener("touchmove", handleTouchMove);
                return 0;
              }

              if (
                newScrollCount >=
                containerRef.current.scrollWidth -
                  containerRef.current.offsetWidth
              ) {
                newScrollCount =
                  containerRef.current.scrollWidth -
                  containerRef.current.offsetWidth;

                document.documentElement.style.overflow = "";
                window.removeEventListener("touchmove", handleTouchMove);
              }

              return newScrollCount;
            });
          };

          window.addEventListener("wheel", handleScroll, { passive: false });
          window.addEventListener("touchmove", handleTouchMove, {
            passive: false,
          });
          window.addEventListener("touchstart", handleTouchStart, {
            passive: true,
          });

          return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("touchmove", handleTouchMove);
          };
        }
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <Container>
      <div className={styles.advantages}>
        <video className={styles.video} autoPlay loop muted playsInline>
          <source src="/videos/logoAnimation.webm" type="video/webm" />
          Ваш браузер не підтримує відео.
        </video>

        <h2 className={styles.title}>Переваги служби в ССО</h2>
        <div className={styles.container} ref={sectionRef}>
          <div
            className={styles.wrapper}
            ref={containerRef}
            style={{ transform: `translateX(-${scrollCount}px)` }}
          >
            {cards.map((card, index) => (
              <AdvantagesCard key={index} card={card} />
            ))}
          </div>
        </div>
        <Calculator></Calculator>
      </div>
    </Container>
  );
};

export default Advantages;
