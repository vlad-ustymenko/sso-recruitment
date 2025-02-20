"use client";

import Container from "@/shared/components/Container/Container";
import { useEffect, useMemo, useState } from "react";

import styles from "./Calculator.module.css";
import Slider from "@/shared/components/Slider/Slider";
import DropDown from "@/shared/components/DropDown/DropDown";

const Calculator = () => {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState(0);
  const [posada, setPosada] = useState("Оберіть опцію");
  const [rank, setRank] = useState("Оберіть опцію");
  const [lengthService, setLengthService] = useState("Оберіть опцію");
  const [result, setResult] = useState(0);
  const [frontDay, setfrontDay] = useState(0);

  useEffect(() => {
    const rankData = rankList.find((item) => item.name === rank);
    if (!rankData) return setResult(frontDay);

    const OVZ = rankData.OVZ || 0;

    if (posada === "Оберіть опцію") {
      setResult(15140 + OVZ + frontDay);
      return;
    }

    const posadaData = rankData.posada.find((item) => item.name === posada);
    if (!posadaData) return;

    const { zp: ZP, oklad: OKLAD } = posadaData;

    if (lengthService === "Оберіть опцію") {
      setResult(15140 + OVZ + ZP + frontDay);
      return;
    }

    const lengthData = lengthServiceList.find(
      (item) => item.name === lengthService
    );
    if (!lengthData) return;

    const vuslugaPersent = lengthData.value || 0;
    const vuslyga = (OVZ + OKLAD) * vuslugaPersent;
    const nadbavka = (OVZ + OKLAD + vuslyga) * 0.878;

    setResult(15140 + OVZ + ZP + vuslyga + nadbavka + frontDay);
  }, [rank, posada, lengthService, frontDay]);

  const rankList = [
    {
      name: "Оберіть опцію",
      posada: [{ zp: 0, oklad: 0 }],
      OVZ: 0,
    },
    {
      name: "Солдат",
      posada: [
        { name: "Водій", zp: 18612, oklad: 2820 },
        { name: "Водій-електрик", zp: 18612, oklad: 2820 },
        { name: "Водій-електрик – механік", zp: 18612, oklad: 2820 },
        { name: "Водій-електрик – оператор", zp: 18612, oklad: 2820 },
        { name: "Водій-заправник", zp: 18612, oklad: 2820 },
        { name: "Водій-кранівник", zp: 18612, oklad: 2820 },
        { name: "Водій-машиніст екскаватора", zp: 18612, oklad: 2820 },
        { name: "Водій-машиніст екскаватора", zp: 18612, oklad: 2820 },
        { name: "Водій-механік", zp: 18612, oklad: 2820 },
        { name: "Водій-номер обслуги", zp: 18612, oklad: 2820 },
        { name: "Водій-радіотелефоніст", zp: 18612, oklad: 2820 },
        { name: "Водій-санітар", zp: 18612, oklad: 2820 },
        { name: "Водій-сапер", zp: 18612, oklad: 2820 },
        { name: "Гранатометник", zp: 18612, oklad: 2820 },
        { name: "Електрик", zp: 17595, oklad: 2550 },
        { name: "Електрик-дизеліст", zp: 17595, oklad: 2550 },
        {
          name: "Зовнішній пілот (оператор) безпілотних літальних апаратів",
          zp: 18837,
          oklad: 2730,
        },
        { name: "Кулеметник", zp: 18612, oklad: 2820 },
        { name: "Кухар", zp: 18216, oklad: 2640 },
        { name: "Майстер", zp: 18837, oklad: 2730 },
        { name: "Майстер-номер обслуги", zp: 18837, oklad: 2730 },
        { name: "Машиніст екскаватора", zp: 17595, oklad: 2550 },
        { name: "Механік", zp: 18216, oklad: 2640 },
        { name: "Механік-водій – кранівник", zp: 19206, oklad: 2910 },
        { name: "Навідник", zp: 19206, oklad: 2910 },
        { name: "Номер обслуги", zp: 18837, oklad: 2730 },
        { name: "Номер обслуги – радіотелефоніст", zp: 18837, oklad: 2730 },
        { name: "Радіотелефоніст", zp: 18216, oklad: 2640 },
        { name: "Радіотелефоніст-лінійний наглядач", zp: 18216, oklad: 2640 },
        { name: "Радіотелефоніст-планшетист", zp: 18216, oklad: 2640 },
        { name: "Розвідник-далекомірник", zp: 18837, oklad: 2730 },
        { name: "Санітар", zp: 18837, oklad: 2730 },
        { name: "Сапер", zp: 18216, oklad: 2640 },
        { name: "Стрілець-зенітник", zp: 18612, oklad: 2820 },
        { name: "Стрілець-номер обслуги", zp: 18612, oklad: 2820 },
        { name: "Стрілець-помічник гранатометника", zp: 18612, oklad: 2820 },
        { name: "Такелажник", zp: 17595, oklad: 2550 },
      ],
      OVZ: 530,
    },
    {
      name: "Старший солдат",
      posada: [
        { name: "Відповідальний виконавець", zp: 20328, oklad: 3080 },
        { name: "Діловод", zp: 18837, oklad: 2730 },
        { name: "Механік-водій", zp: 19206, oklad: 2910 },
        { name: "Начальник електростанції", zp: 18837, oklad: 2730 },
        { name: "Оператор (5 тарифний розряд)", zp: 18612, oklad: 2820 },
        { name: "Оператор (7 тарифний розряд)", zp: 19800, oklad: 3000 },
        { name: "Оператор-вогнеметник", zp: 19800, oklad: 3000 },
        { name: "Старший водій", zp: 19206, oklad: 2910 },
        { name: "Старший водій-гранатометник", zp: 19206, oklad: 2910 },
        {
          name: "Старший водій-машиніст заправної машини",
          zp: 19206,
          oklad: 2910,
        },
        { name: "Старший кухар", zp: 18837, oklad: 2730 },
        { name: "Старший майстер", zp: 18612, oklad: 2820 },
        { name: "Старший механік", zp: 18837, oklad: 2730 },
        {
          name: "Старший механік-водій (7 тарифний розряд)",
          zp: 19800,
          oklad: 3000,
        },
        { name: "Старший навідник", zp: 19206, oklad: 2910 },
        { name: "Старший сапер", zp: 18612, oklad: 2820 },
      ],
      OVZ: 600,
    },
    {
      name: "Молодший сержант",
      posada: [
        { name: "Бойовий медик взводу", zp: 19800, oklad: 3000 },
        {
          name: "Заступник командира бойової машини – навідник-оператор",
          zp: 20328,
          oklad: 3080,
        },
        { name: "Командир міномета", zp: 20328, oklad: 3080 },
        { name: "Начальник лазні", zp: 18612, oklad: 2820 },
        {
          name: "Старший механік-водій (8 тарифний розряд)",
          zp: 20328,
          oklad: 3080,
        },
        { name: "Старший оператор-вогнеметник", zp: 20328, oklad: 3080 },
      ],
      OVZ: 670,
    },
    {
      name: "Сержант",
      posada: [
        { name: "Командир бойової машини", zp: 20922, oklad: 3170 },
        {
          name: "Командир бойової машини – командир відділення",
          zp: 20922,
          oklad: 3170,
        },
        { name: "Командир гармати", zp: 20328, oklad: 3080 },
        { name: "Командир танка", zp: 20922, oklad: 3170 },
        { name: "Санітарний інструктор", zp: 19800, oklad: 3000 },
        { name: "Старший бойовий медик", zp: 19800, oklad: 3000 },
        { name: "Старший оператор", zp: 20328, oklad: 3080 },
      ],
      OVZ: 740,
    },
    {
      name: "Старший сержант",
      posada: [
        {
          name: "Головний сержант – командир відділення",
          zp: 20528,
          oklad: 3260,
        },
        { name: "Головний сержант – командир гармати", zp: 20528, oklad: 3260 },
        {
          name: "Головний сержант – командир міномета",
          zp: 20528,
          oklad: 3260,
        },
        { name: "Головний сержант – командир танка", zp: 20528, oklad: 3260 },
        {
          name: "Головний сержант (10 тарифний розряд)",
          zp: 20528,
          oklad: 3260,
        },
        { name: "Інструктор", zp: 21105, oklad: 3350 },
        { name: "Командир відділення", zp: 20922, oklad: 3170 },
        {
          name: "Начальник групи секретного документального забезпечення",
          zp: 20328,
          oklad: 3080,
        },
        {
          name: "Сержант із матеріального забезпечення",
          zp: 20538,
          oklad: 3260,
        },
        {
          name: "Фельдшер",
          zp: 20328,
          oklad: 3080,
        },
        {
          name: "Штаб-сержант 3 категорії",
          zp: 20538,
          oklad: 3260,
        },
      ],
      OVZ: 810,
    },
    {
      name: "Головний сержант",
      posada: [
        {
          name: "Головний сержант (12 тарифний розряд)",
          zp: 21672,
          oklad: 3440,
        },
        { name: "Заступник командира групи", zp: 20538, oklad: 3260 },
        {
          name: "Командир взводу (11 тарифний розряд)",
          zp: 21105,
          oklad: 3350,
        },
        { name: "Технік", zp: 20538, oklad: 3260 },
      ],
      OVZ: 880,
    },
    {
      name: "Штаб-сержант",
      posada: [
        {
          name: "Головний сержант (18 тарифний розряд)",
          zp: 24111,
          oklad: 4230,
        },
        { name: "Старший технік", zp: 2053, oklad: 3260 },
      ],
      OVZ: 950,
    },
    {
      name: "Старший лейтенант",
      posada: [
        { name: "Заступник командира батареї", zp: 24111, oklad: 4230 },
        {
          name: "Заступник командира батареї з озброєння",
          zp: 24111,
          oklad: 4230,
        },
        { name: "Заступник командира роти", zp: 24111, oklad: 4230 },
        {
          name: "Заступник командира роти з озброєння",
          zp: 24111,
          oklad: 4230,
        },
        {
          name: "Командир взводу (12 тарифний розряд)",
          zp: 21672,
          oklad: 3440,
        },
        {
          name: "Командир взводу – старший офіцер на батареї",
          zp: 21672,
          oklad: 3440,
        },
        {
          name: "Начальник групи (13 тарифний розряд)",
          zp: 21824,
          oklad: 3550,
        },
        { name: "Офіцер", zp: 21672, oklad: 3440 },
      ],
      OVZ: 1200,
    },
    {
      name: "Старший лейтенант медичної служби",
      posada: [{ name: "Начальник медичного пункту", zp: 21824, oklad: 3520 }],
      OVZ: 1200,
    },
    {
      name: "Капітан",
      posada: [
        { name: "Командир батареї", zp: 24909, oklad: 4370 },
        { name: "Командир групи", zp: 21824, oklad: 3520 },
        {
          name: "Начальник групи (19 тарифний розряд)",
          zp: 24909,
          oklad: 4370,
        },
        {
          name: "Начальник групи – заступник начальника штабу",
          zp: 25707,
          oklad: 4510,
        },
        { name: "Старший офіцер", zp: 21824, oklad: 3520 },
      ],

      OVZ: 1270,
    },
    {
      name: "Майор",
      posada: [
        {
          name: "Заступник командира загону",
          zp: 27666,
          oklad: 5220,
        },
        {
          name: "Заступник командира загону з логістики",
          zp: 27666,
          oklad: 5220,
        },
        {
          name: "Заступник командира загону з психологічної підтримки персоналу",
          zp: 27666,
          oklad: 5220,
        },
        { name: "Командир роти", zp: 24909, oklad: 4370 },
        {
          name: "Начальник штабу – заступник командира загону",
          zp: 27666,
          oklad: 5220,
        },
      ],
      OVZ: 1340,
    },

    {
      name: "Підполковник",
      posada: [{ name: "Командир загону", zp: 28408, oklad: 5360 }],
      OVZ: 1410,
    },
  ];
  const handleRankChange = (newRank) => {
    setRank(newRank);
    setPosada("Оберіть опцію");
    setLengthService("Оберіть опцію");
  };

  const selectedRank = rankList.find((r) => r.name === rank);

  const lengthServiceList = [
    { name: "Оберіть опцію", value: 0 },
    { name: "1-4 роки", value: 0.25 },
    { name: "5-9 років", value: 0.3 },
    { name: "10-14 років", value: 0.35 },
    { name: "20-24 роки", value: 0.45 },
    { name: "25-50 років", value: 0.5 },
  ];

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
          <div className={styles.dropDownsWrapper}>
            <DropDown
              list={rankList}
              title={"Звання"}
              selectTitle={rank}
              onChange={handleRankChange}
            />
            <DropDown
              list={selectedRank ? selectedRank.posada : []}
              title={"Посада"}
              selectTitle={posada}
              onChange={setPosada}
              disabled={rank === "Оберіть опцію"}
            />
            <DropDown
              list={lengthServiceList}
              title={"Вислуга років"}
              selectTitle={lengthService}
              onChange={setLengthService}
              disabled={posada === "Оберіть опцію"}
            />
          </div>
          <div className={styles.subtitle}>Кількість днів на бойових</div>
          <Slider
            step={step}
            setStep={setStep}
            value={value}
            setValue={setValue}
            setfrontDay={setfrontDay}
          />
        </div>
        <div className={styles.resultWrapper}>
          <p className={styles.resultText}>
            * В розрахунок не беруться деякі показники, які
            <br /> використовуються для діючих військовослужбовців
          </p>
          <div className={styles.result}>{`${Math.floor(result).toLocaleString(
            "uk-UA"
          )} грн`}</div>
        </div>
      </div>
    </Container>
  );
};

export default Calculator;
