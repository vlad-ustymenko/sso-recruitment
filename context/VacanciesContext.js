"use client"; // Контекст працює на клієнті

import { createContext, useContext, useState, useEffect } from "react";

const VacanciesContext = createContext();

export const VacanciesProvider = ({ children }) => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/vacancies`,
          {
            cache: "no-store",
          }
        );
        const data = await res.json();
        setVacancies(data);
      } catch (error) {
        console.error("Помилка завантаження вакансій:", error);
      }
    };

    fetchVacancies();
  }, []);

  return (
    <VacanciesContext.Provider value={{ vacancies }}>
      {children}
    </VacanciesContext.Provider>
  );
};

export const useVacanciesContext = () => useContext(VacanciesContext);
