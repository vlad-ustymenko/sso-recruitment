"use client";

import { useState, useEffect, useRef } from "react";
import Container from "../Container/Container";
import styles from "./Tabs.module.css";
import TabArrow from "../TabArrow/TabArrow";

const ContentComponent = ({ content, active, padding }) => {
  // Замінюємо всі нові рядки на <br>
  const contentWithLineBreaks = content.split("\n").map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));

  return (
    <div
      className={styles.tabContent}
      style={{
        marginBottom: active ? "28px" : "0px",
        padding: `0 ${padding}px`,
      }}
    >
      {contentWithLineBreaks}
    </div>
  );
};

const tabs = [
  {
    id: 1,
    title: "Скільки часу потрібно для оформлення в ССО?",
    content: "Тут буде інформація про оформлення в ССО.",
  },
  {
    id: 2,
    title:
      "Якщо я хочу обрати собі військову спеціальність, як мені це зробити в ССО?",
    content: `Безпека бійців – наш пріоритет.\nА життя воїна – найвища цінність.\nКожен пілот і оператор БпЛА проходять ретельну підготовку та навчання,\n перш ніж долучається до виконання бойових завдань.
		\nСпеціалісти Яструбів - розробники ресурсу «Вежа», що збирає, дешифрує та\n аналізує інформацію. Використовуючи “Вежу” ми впливаємо на темп та\n ефективність ведення бойових дій. 
Чим швидше ми обробимо дані – тим скоріше відбудеться ураження.`,
  },
  {
    id: 3,
    title: "Скільки часу потрібно для оформлення в ССО?",
    content: "Тут буде інформація про оформлення в ССО.",
  },
  {
    id: 4,
    title:
      "Якщо я хочу обрати собі військову спеціальність, як мені це зробити в ССО?",
    content: `Безпека бійців – наш пріоритет.\nА життя воїна – найвища цінність.\nКожен пілот і оператор БпЛА проходять ретельну підготовку та навчання,\n перш ніж долучається до виконання бойових завдань.
		\nСпеціалісти Яструбів - розробники ресурсу «Вежа», що збирає, дешифрує та\n аналізує інформацію. Використовуючи “Вежу” ми впливаємо на темп та\n ефективність ведення бойових дій. 
Чим швидше ми обробимо дані – тим скоріше відбудеться ураження.`,
  },
  {
    id: 5,
    title: "Скільки часу потрібно для оформлення в ССО?",
    content: "Тут буде інформація про оформлення в ССО.",
  },
  {
    id: 6,
    title:
      "Якщо я хочу обрати собі військову спеціальність, як мені це зробити в ССО?",
    content: `Безпека бійців – наш пріоритет.\nА життя воїна – найвища цінність.\nКожен пілот і оператор БпЛА проходять ретельну підготовку та навчання,\n перш ніж долучається до виконання бойових завдань.
		\nСпеціалісти Яструбів - розробники ресурсу «Вежа», що збирає, дешифрує та\n аналізує інформацію. Використовуючи “Вежу” ми впливаємо на темп та\n ефективність ведення бойових дій. 
Чим швидше ми обробимо дані – тим скоріше відбудеться ураження.`,
  },
];

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const contentContainerRef = useRef(null);
  const tabContentWrapperRef = useRef(null);
  const [paddingContent, setPaddingContent] = useState(0);

  useEffect(() => {
    if (contentContainerRef.current) {
      setPaddingContent(
        tabContentWrapperRef.current.offsetWidth -
          contentContainerRef.current.offsetWidth -
          60
      );
    }
  }, []);

  return (
    <Container>
      <h2 className={styles.title}>В нас є відповіді на твої питання</h2>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={styles.tabContainer}
          onClick={() => setActiveTab(tab.id)}
        >
          <div className={styles.tabTitleWrapper} ref={tabContentWrapperRef}>
            <div className={styles.tabNumber}>0{tab.id}</div>
            <div className={styles.tabTitle} ref={contentContainerRef}>
              {tab.title}
            </div>
            <TabArrow open={activeTab === tab.id} />
          </div>
          <div
            className={
              activeTab === tab.id
                ? `${styles.tabContentWrapper} ${styles.activeTab}`
                : styles.tabContentWrapper
            }
          >
            <ContentComponent
              content={tab.content}
              active={activeTab === tab.id}
              padding={paddingContent}
            />
          </div>
        </div>
      ))}
    </Container>
  );
}
