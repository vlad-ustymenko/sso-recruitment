"use client";

import { useState } from "react";
import Container from "../Container/Container";
import styles from "./Tabs.module.css";

const ContentComponent = ({ content }) => {
  // Замінюємо всі нові рядки на <br>
  const contentWithLineBreaks = content.split("\n").map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));

  return <div>{contentWithLineBreaks}</div>;
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
];

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <Container>
      {tabs.map((tab) => (
        <div key={tab.id} className={styles.tabContainer}>
          <div className={styles.tabTitleWrapper}>
            <div className={styles.tabNumber}>0{tab.id}</div>
            <div className={styles.tabTitle}>{tab.title}</div>
            <div>wefwe</div>
          </div>
          <div className={styles.tabContentWrapper}>
            <ContentComponent content={tab.content} />
          </div>
        </div>
      ))}
    </Container>
    // <div className={styles.container}>
    //   {tabs.map((tab) => (
    //     <div key={tab.id} className={styles.tabItem}>
    //       <button
    //         className={`${styles.tabButton} ${
    //           activeTab === tab.id ? styles.active : ""
    //         }`}
    //         onClick={() => setActiveTab(activeTab === tab.id ? null : tab.id)}
    //       >
    //         {tab.title}
    //         <span>{activeTab === tab.id ? "▲" : "▼"}</span>
    //       </button>
    //       {activeTab === tab.id && (
    //         <div className={styles.tabContent}>{tab.content}</div>
    //       )}
    //     </div>
    //   ))}
    // </div>
  );
}
