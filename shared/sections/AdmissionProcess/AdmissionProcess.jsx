"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdmissionProcess.module.css";
import Container from "@/shared/components/Container/Container";

const AdmissionProcess = () => {
  const properties = {
    0: {
      width: `1%`,
      stepTitle: `Подача заявки`,
      stepDescription: `29 грудня 2024`,
    },
    1: {
      width: `15%`,
      stepTitle: `Крок 2`,
      stepDescription: `Первинна співбесіда з центром рекрутингу (3 дні)`,
    },
    2: {
      width: `25%`,
      stepTitle: `Крок 3`,
      stepDescription: `Відбір та співбесіда з командиром підрозділу (7 днів)`,
    },
    3: {
      width: `45%`,
      stepTitle: `Крок 4`,
      stepDescription: `Підготовка документів, перевірка внутрішньої безпеки, проходження ВЛК (30 днів)`,
    },
    4: {
      width: `68%`,
      stepTitle: `Крок 5`,
      stepDescription: `Зарахування до списків частини та відправка на БЗВП н 7 тижнів`,
    },
    5: {
      width: `97%`,
      stepTitle: `Фініш`,
      stepDescription: `Повернення в частину для проходження служби`,
    },
  };

  const [activeStep, setActiveStep] = useState(1);
  const [viewWidth, setViewWidth] = useState(0);
  const [isDesctop, setIsDesctop] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setViewWidth(window.innerWidth);
    if (viewWidth > 1279) {
      setIsDesctop(true);
    }
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedDate = formatter.format(today).replace(" р.", "");
    setToday(formattedDate);
  }, [viewWidth]);

  const handleActiveStep = (id) => {
    setActiveStep((prev) => (prev = id));
  };
  return (
    <Container>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Процес вступу до ССО</h2>
        <h3 className={styles.description}>
          Дізнайтесь все саме актуальне про те як підготуватись до служби в ССО
        </h3>
      </div>
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={
            isDesctop
              ? {
                  width:
                    activeStep > 4 ? "100%" : `${properties[activeStep].width}`,
                }
              : {
                  height:
                    activeStep > 4 ? "100%" : `${properties[activeStep].width}`,
                }
          }
        ></div>
        <div className={styles.progressBarBackground}></div>
        {Array.from({ length: 6 }, (dot, i) => i + 1).map((dot, index) => (
          <div
            key={dot}
            className={styles.dotWrapper}
            style={
              isDesctop
                ? { left: `${properties[index].width}` }
                : { top: `${properties[index].width}` }
            }
            onClick={() => handleActiveStep(index)}
          >
            <div className={styles.dot} />
          </div>
        ))}
        <ul className={styles.linesWrapper}>
          {Array.from({ length: 6 }, (lines, i) => i + 1).map(
            (lines, index) => (
              <li
                key={lines}
                className={styles.line}
                style={
                  isDesctop
                    ? {
                        left: `${properties[index].width}`,
                        height: activeStep >= index ? "79px" : "0",
                      }
                    : {
                        top: `${properties[index].width}`,
                        width:
                          activeStep >= index ? `${viewWidth * 0.07}px` : "0",
                      }
                }
              />
            )
          )}
        </ul>
        <ul className={styles.stepsList}>
          {Array.from({ length: 6 }, (step, i) => i + 1).map((steps, index) => (
            <li
              key={steps}
              className={styles.stepTitle}
              style={
                isDesctop
                  ? {
                      left: `${properties[index].width}`,
                      opacity: activeStep >= index ? "1" : "0",
                    }
                  : {
                      top: `${properties[index].width}`,
                      opacity: activeStep >= index ? "1" : "0",
                      transform:
                        index % 2 === 0
                          ? `translate(${viewWidth * 0.07}px, -50%)`
                          : `translate(calc(-100% - ${
                              viewWidth * 0.07
                            }px), -50%)`,
                    }
              }
            >
              {properties[index].stepTitle}
            </li>
          ))}
        </ul>
        <ul className={styles.stepsDescriptionsWrapper}>
          {Array.from({ length: 6 }, (description, i) => i + 1).map(
            (description, index) => (
              <li
                key={description}
                className={styles.stepDescription}
                style={
                  isDesctop
                    ? {
                        left: `${properties[index].width}`,
                        opacity: activeStep >= index ? 1 : 0,
                      }
                    : {
                        top:
                          index === 5 ? "unset" : `${properties[index].width}`,
                        opacity: activeStep >= index ? 1 : 0,
                        width: `${viewWidth / 2 - 40}px`,
                        bottom: index === 5 ? "85px" : "unset",
                        transform:
                          index % 2 === 0
                            ? `translate(${viewWidth * 0.07}px, 40px)`
                            : `translate(calc(-100% - ${
                                viewWidth * 0.07
                              }px), 40px)`,
                      }
                }
              >
                {index === 0
                  ? `${today}`
                  : `${properties[index].stepDescription}`}
              </li>
            )
          )}
        </ul>
      </div>
    </Container>
  );
};

export default AdmissionProcess;
