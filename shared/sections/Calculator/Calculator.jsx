"use client";

import Container from "@/shared/components/Container/Container";
import { useState } from "react";

import styles from "./Calculator.module.css";
import Slider from "@/shared/components/Slider/Slider";
import DropDown from "@/shared/components/DropDown/DropDown";

const Calculator = () => {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState(0);
  const [jobTitle, setJobTitle] = useState("Оберіть опцію");
  const [rank, setRank] = useState("Оберіть опцію");
  const [lengthService, setLengthService] = useState("Оберіть опцію");

  const calculator = {
    "Оберіть опцію": 0,
    Рядовий: 12000,
    Сержант: 13000,
    Лейтенант: 14000,
    Капітан: 15000,
    Майор: 16000,
    Підполковник: 17000,
    Полковник: 18000,
    "Генерал-лейтенант": 19000,
    "Генерал-капітан": 20000,
    "Генерал-полковник": 21000,
    Авіація: 0.1,
    Аналітика: 0.2,
    Бпла: 0.3,
    Діловодство: 0.2,
    "Зв'язок": 0.1,
    Інженерія: 0.2,
    Артилерія: 0.3,
    Медицина: 0.4,
    "1 рік": 0.1,
    "2 роки": 0.2,
    "3 роки": 0.3,
    "4 роки": 0.4,
    "5 років": 0.5,
  };

  const rankList = [
    "Рядовий",
    "Сержант",
    "Лейтенант",
    "Капітан",
    "Майор",
    "Підполковник",
    "Полковник",
    "Генерал-лейтенант",
    "Генерал-капітан",
    "Генерал-полковник",
  ];
  const jobTitleList = [
    "Авіація",
    "Аналітика",
    "Бпла",
    "Діловодство",
    "Зв'язок",
    "Інженерія",
    "Артилерія",
    "Медицина",
  ];

  const getYearsArray = (count) => {
    const years = [];

    for (let i = 1; i <= count; i++) {
      let suffix = "років";

      if (i === 1) suffix = "рік";
      else if (i >= 2 && i <= 4) suffix = "роки";

      years.push(`${i} ${suffix}`);
    }

    return years;
  };
  const lengthServiceList = getYearsArray(30);

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
          <div className={styles.dropdownsWrapper}>
            <DropDown
              list={rankList}
              title={"Звання"}
              selectTitle={rank}
              onChange={setRank}
            />
            <DropDown
              list={jobTitleList}
              title={"Посада"}
              selectTitle={jobTitle}
              onChange={setJobTitle}
            />
            <DropDown
              list={lengthServiceList}
              title={"Вислуга років"}
              selectTitle={lengthService}
              onChange={setLengthService}
            />
          </div>
          <div className={styles.subtitle}>Кількість днів на бойових</div>
          <Slider
            step={step}
            setStep={setStep}
            value={value}
            setValue={setValue}
          />
        </div>
        <div className={styles.resultWrapper}>
          <p className={styles.resultText}>
            * В розрахунок не беруться деякі показники, які
            <br /> використовуються для діючих військовослужбовців
          </p>
          <div className={styles.result}>
            {(
              calculator[rank] +
              calculator[rank] * calculator[jobTitle] +
              3000 * value
            ).toLocaleString("uk-UA")}{" "}
            грн
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Calculator;
