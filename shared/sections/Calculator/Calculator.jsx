import Container from "@/shared/components/Container/Container";
import React from "react";
import styles from "./Calculator.module.css";
import Slider from "@/shared/components/Slider/Slider";

const Calculator = () => {
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>
              Калькулятор
              <br /> зарплати
            </h2>
            <p className={styles.description}>
              Дізнайтесь скільки ви можете заробляти, приєднавшись до ССО
            </p>
          </div>
          <div className={styles.subtitle}>Кількість днів на бойових</div>
          <Slider />
        </div>
        <div className={styles.resultWrapper}>
          <p className={styles.resultText}>
            * В розрахунок не беруться деякі показники, які
            <br /> використовуються для діючих військовослужбовців
          </p>
          <div className={styles.result}>56 800 грн</div>
        </div>
      </div>
    </Container>
  );
};

export default Calculator;
