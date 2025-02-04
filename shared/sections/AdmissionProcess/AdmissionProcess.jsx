"use client";
import React, { useEffect, useState } from "react";
import styles from "./AdmissionProcess.module.css";
import Container from "@/shared/components/Container/Container";

const AdmissionProcess = () => {
  const properties = {
    0: {
      width: `1%`,
      stepTitle: `Подача заявки`,
      stepDescription: `Наприклад сьогодні29 грудня 2024`,
    },
    1: {
      width: `20%`,
      stepTitle: `Крок 2`,
      stepDescription: `Кілька слів про цей крок, дуже лаконічно`,
    },
    2: {
      width: `35%`,
      stepTitle: `Крок 3`,
      stepDescription: `Кілька слів про цей крок, дуже лаконічно`,
    },
    3: {
      width: `57%`,
      stepTitle: `Крок 4`,
      stepDescription: `Кілька слів про цей крок, дуже лаконічно`,
    },
    4: {
      width: `68%`,
      stepTitle: `Крок 5`,
      stepDescription: `Кілька слів про цей крок, дуже лаконічно`,
    },
    5: {
      width: `99%`,
      stepTitle: `Фініш`,
      stepDescription: `Фініш 29 лютого 2024`,
    },
  };

  const [activeStep, setActiveStep] = useState(1);
  console.log(activeStep);

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
          style={{
            width: activeStep > 4 ? "100%" : `${properties[activeStep].width}`,
          }}
        ></div>
        <div className={styles.progressBarBackground}></div>
        {Array.from({ length: 6 }, (dot, i) => i + 1).map((dot, index) => (
          <div
            key={dot}
            className={styles.dotWrapper}
            style={{ left: `${properties[index].width}` }}
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
                style={{
                  left: `${properties[index].width}`,
                  height: activeStep >= index ? "79px" : "0",
                }}
              />
            )
          )}
        </ul>
        <ul className={styles.stepsList}>
          {Array.from({ length: 6 }, (step, i) => i + 1).map((steps, index) => (
            <li
              key={steps}
              className={styles.stepTitle}
              style={{
                left: `${properties[index].width}`,
                opacity: activeStep >= index ? "1" : "0",
              }}
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
                style={{
                  left: `${properties[index].width}`,
                  opacity: activeStep >= index ? 1 : 0,
                }}
              >
                {properties[index].stepDescription}
              </li>
            )
          )}
        </ul>
      </div>
    </Container>
  );
};

export default AdmissionProcess;
