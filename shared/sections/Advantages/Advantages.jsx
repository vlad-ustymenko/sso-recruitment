"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Advantages.module.css";
import Container from "@/shared/components/Container/Container";
import AdvantagesCard from "@/shared/components/AdvantagesCard/AdvantagesCard";

const Advantages = () => {
  const cards = [
    {
      title: "Людяний підхід",
      description:
        "Людиноцентричний підхід, кваліфіковані та досвічені командири",
      imgSrc: "/images/icons/hands.png",
    },
    ,
    {
      title: "Грошове забезпечення",
      description:
        "Людиноцентричний підхід, кваліфіковані та досвічені командири",
      imgSrc: "/images/icons/helmet.png",
    },
    ,
    {
      title: "Військова підготовка",
      description:
        "Людиноцентричний підхід, кваліфіковані та досвічені командири",
      imgSrc: "/images/icons/money.png",
    },
    ,
    {
      title: "Якісне навчання",
      description:
        "Людиноцентричний підхід, кваліфіковані та досвічені командири",
      imgSrc: "/images/icons/head.png",
    },
    {
      title: "Сучасна зброя",
      description:
        "Людиноцентричний підхід, кваліфіковані та досвічені командири",
      imgSrc: "/images/icons/fire.png",
    },

    {
      title: "Зграя професіоналів",
      description:
        "Людиноцентричний підхід, кваліфіковані та досвічені командири",
      imgSrc: "/images/icons/wolf.png",
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
        if (entry.intersectionRatio === 1) {
          document.documentElement.style.overflow = "hidden";

          window.scrollTo({
            top: window.scrollY,
            behavior: "instant",
          });

          const handleScroll = (e) => {
            e.preventDefault();
            const delta = e.deltaY;

            setScrollCount((prevscrollCount) => {
              let newscrollCount = prevscrollCount + delta;

              if (containerRef.current) {
                if (
                  newscrollCount >=
                  containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth
                ) {
                  newscrollCount =
                    containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth;

                  document.documentElement.style.overflow = "";
                  window.removeEventListener("wheel", handleScroll);
                }

                if (newscrollCount < 0) {
                  document.documentElement.style.overflow = "";
                  window.removeEventListener("wheel", handleScroll);
                  return 0;
                }
              }

              return newscrollCount;
            });
          };

          const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientY;
          };

          const handleTouchMove = (e) => {
            const touchMoveX = touchStartX.current - e.touches[0].clientY;
            if (touchMoveX < 0) {
              const delta = -30;
              setScrollCount((prevscrollCount) => {
                let newscrollCount = prevscrollCount + delta;
                if (newscrollCount <= 0) {
                  document.documentElement.style.overflow = "";
                  window.removeEventListener("touchmove", handleTouchMove);
                  return 0;
                }
                return newscrollCount;
              });
            }
            if (touchMoveX > 0) {
              const delta = 30;
              setScrollCount((prevscrollCount) => {
                let newscrollCount = prevscrollCount + delta;
                if (
                  newscrollCount >=
                  containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth
                ) {
                  newscrollCount =
                    containerRef.current.scrollWidth -
                    containerRef.current.offsetWidth;

                  document.documentElement.style.overflow = "";
                  window.removeEventListener("touchmove", handleTouchMove);
                }
                return newscrollCount;
              });
            }
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
        threshold: 1,
      }
    );

    observer.observe(section);

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
          ref={containerRef}
          style={{ transform: `translateX(-${scrollCount}px)` }}
        >
          {cards.map((card, index) => (
            <AdvantagesCard key={index} card={cards[index]} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Advantages;
