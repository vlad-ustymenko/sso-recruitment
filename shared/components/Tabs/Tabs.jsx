"use client";

import { useState, useEffect, useRef } from "react";
import Container from "../Container/Container";
import styles from "./Tabs.module.css";
import { Trash2, ClipboardPenLine } from "lucide-react";
import TabArrow from "../Arrow/Arrow";
import Link from "next/link";
import FormattedText from "../FormatedTabContent/FormatedTabContent";

export default function Tabs({ tabs, title, admin, deleteTab }) {
  const [activeTab, setActiveTab] = useState(null);
  const contentContainerRef = useRef(null);
  const tabContentWrapperRef = useRef(null);
  const [paddingContent, setPaddingContent] = useState(0);

  useEffect(() => {
    if (tabs.length > 0 && activeTab === null) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs, activeTab]);

  useEffect(() => {
    const updatePaddingContent = () => {
      if (contentContainerRef.current && tabContentWrapperRef.current) {
        setPaddingContent(
          tabContentWrapperRef.current.offsetWidth -
            contentContainerRef.current.offsetWidth -
            60
        );
      }
    };

    updatePaddingContent();
    window.addEventListener("resize", updatePaddingContent);

    return () => {
      window.removeEventListener("resize", updatePaddingContent);
    };
  }, [tabs]);

  const handleDelete = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей таб?")) {
      deleteTab(id);
    }
  };

  return (
    <Container>
      {title && <h2 className={styles.title}>{title}</h2>}
      <ul className={styles.tabsList}>
        {tabs.map((tab, index) => (
          <li key={tab._id} className={styles.tabContainer}>
            <div className={styles.tabWrapper}>
              <div
                className={styles.tabTitleWrapper}
                ref={tabContentWrapperRef}
                onClick={() => {
                  setActiveTab(tab._id);
                  if (activeTab === tab._id) {
                    setActiveTab(null);
                    return;
                  }
                }}
              >
                <div className={styles.tabNumber}>
                  {index < 9 ? `0${index + 1}` : `${index + 1}`}
                </div>
                <div className={styles.tabTitle} ref={contentContainerRef}>
                  {tab.title}
                </div>
                <TabArrow open={activeTab === tab._id} />
              </div>
              <div
                className={
                  activeTab === tab._id
                    ? `${styles.tabContentWrapper} ${styles.activeTab}`
                    : styles.tabContentWrapper
                }
              >
                <FormattedText
                  content={tab.content}
                  className={styles.content}
                  paddingContent={paddingContent}
                  activeTab={activeTab}
                  tab={tab._id}
                />
              </div>
            </div>
            {admin && (
              <div className={styles.buttonsWrapper}>
                <span title="Видалити">
                  <Trash2
                    className={styles.button}
                    onClick={() => handleDelete(tab._id)}
                  />
                </span>

                <Link href={`/dashboard/editTab/${tab._id}`} title="Редагувати">
                  <ClipboardPenLine className={styles.button} />
                </Link>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}
