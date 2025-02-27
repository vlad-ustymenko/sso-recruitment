"use client";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import React, { useState, useEffect } from "react";
import { useVacanciesContext } from "@/context/VacanciesContext";
import { useTabsContext } from "@/context/TabsContext";
import Container from "@/shared/components/Container/Container";
import styles from "./page.module.css";
import BrFromater from "../../../shared/components/BrFormater/BrFromater";
import Link from "next/link";
import Tabs from "@/shared/components/Tabs/Tabs";

export default function Dashboard() {
  const [activePanel, setActivePanel] = useState("tabs");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { vacancies, updateVacancyStatus, deleteVacancy } =
    useVacanciesContext();

  const { tabs, deleteTab } = useTabsContext();

  const [filterRank, setFilterRank] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterActive, setFilterActive] = useState(null);

  const [filteredVacancies, setFilteredVacancies] = useState(vacancies);

  useEffect(() => {
    let filtered = vacancies.filter((vacancy) => {
      return (
        (filterRank === null || vacancy.rank === filterRank) &&
        (filterType === null || vacancy.type === filterType) &&
        (filterActive === null || vacancy.isActive.toString() === filterActive)
      );
    });

    setFilteredVacancies(filtered);
  }, [filterRank, filterType, filterActive, vacancies]);

  useEffect(() => {
    const getToken = () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem("token");
      }
      return null;
    };

    const token = getToken();

    if (!token) {
      redirect("/login");
    }

    try {
      const decoded = jwt.decode(token);
      if (!decoded) throw new Error("Недійсний токен");
      setIsAuthenticated(true);
    } catch (error) {
      redirect("/login");
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const handleToggleActive = (id, currentStatus) => {
    updateVacancyStatus(id, !currentStatus);
  };

  const handleDelete = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цю вакансію?")) {
      deleteVacancy(id);
    }
  };

  const rankList = [
    { name: "Фільтр посади", value: "" },
    { name: "Солдатські посади", value: "soldier" },
    { name: "Сержантські посади", value: "sergeant" },
    { name: "Офіцерські посади", value: "officer" },
  ];

  const typeList = [
    { name: "Фільтр напрямку", value: "" },
    { name: "Бойові", value: "front" },
    { name: "Тилові", value: "rear" },
  ];

  const activeList = [
    { name: "Фільтр активності", value: "" },
    { name: "Активна", value: "true" },
    { name: "Неактивна", value: "false" },
  ];

  return (
    <Container>
      <>
        <div className={styles.container}>
          <button
            className={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem("token");
              document.location.reload();
            }}
          >
            Вийти
          </button>

          <div className={styles.mainButtonsWrapper}>
            <button
              className={
                activePanel === "tabs"
                  ? `${styles.mainButton} ${styles.active}`
                  : `${styles.mainButton}`
              }
              onClick={() => setActivePanel("tabs")}
            >
              Таби
            </button>
            <button
              className={
                activePanel === "vacancies"
                  ? `${styles.mainButton} ${styles.active}`
                  : `${styles.mainButton}`
              }
              onClick={() => setActivePanel("vacancies")}
            >
              Вакансії
            </button>
          </div>

          {activePanel === "tabs" ? (
            <Link href="/dashboard/createTab" className={styles.createButton}>
              Створити
            </Link>
          ) : (
            <Link href="/dashboard/create" className={styles.createButton}>
              Створити
            </Link>
          )}
        </div>
        {activePanel === "tabs" ? (
          <Tabs tabs={tabs} admin deleteTab={deleteTab}></Tabs>
        ) : (
          <>
            <div className={styles.filterWrapper}>
              <select
                value={filterRank || ""}
                onChange={(e) => setFilterRank(e.target.value || null)}
                style={{
                  border: filterRank !== null && "2px solid #0E7151",
                }}
              >
                {rankList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                value={filterType || ""}
                onChange={(e) => setFilterType(e.target.value || null)}
                style={{
                  border: filterType !== null && "2px solid #0E7151",
                }}
              >
                {typeList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select
                value={filterActive || ""}
                onChange={(e) => setFilterActive(e.target.value || null)}
                style={{
                  border: filterActive !== null && "2px solid #0E7151",
                }}
              >
                {activeList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <ul className={styles.vacanciesContainer}>
              {filteredVacancies.map((vacancy) => (
                <li
                  className={styles.vacancyWrapper}
                  key={vacancy._id}
                  style={{
                    backgroundColor: vacancy.isActive ? "white" : "#ededed",
                    color: vacancy.isActive ? "black" : "gray",
                  }}
                >
                  <div
                    className={styles.vacancyImage}
                    style={{
                      backgroundImage: `url(${vacancy.smallImage})`,
                      filter: vacancy.isActive ? "blur(0)" : "blur(3px)",
                    }}
                  >
                    <div
                      className={styles.vacancyIcon}
                      style={{ backgroundImage: `url(${vacancy.iconImage})` }}
                    ></div>
                  </div>
                  <div className={styles.vacancyContent}>
                    <div className={styles.vacancyTitle}>{vacancy.title}</div>
                    <BrFromater
                      className={styles.vacancyDescription}
                      text={vacancy.description}
                    />
                  </div>
                  <div className={styles.buttonsWrapper}>
                    <button
                      className={styles.button}
                      onClick={() =>
                        handleToggleActive(vacancy._id, vacancy.isActive)
                      }
                      style={{
                        backgroundColor: "#1B946E",
                      }}
                    >
                      {vacancy.isActive ? "Деактивувати" : "Активувати"}
                    </button>

                    <Link
                      href={`dashboard/edit/${vacancy._id}`}
                      className={styles.button}
                      style={{
                        backgroundColor: "gray",
                      }}
                    >
                      Редагувати
                    </Link>

                    <button
                      className={styles.button}
                      style={{ backgroundColor: "#f49292" }}
                      onClick={() => handleDelete(vacancy._id)}
                    >
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    </Container>
  );
}
