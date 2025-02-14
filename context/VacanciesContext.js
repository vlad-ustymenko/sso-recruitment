"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const VacanciesContext = createContext();

export const VacanciesProvider = ({ children }) => {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функція для завантаження вакансій
  const fetchVacancies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/vacancies`, { cache: "no-store" });
      const data = await res.json();
      setVacancies(data);
    } catch (err) {
      setError("Помилка завантаження вакансій");
      console.error("Помилка завантаження вакансій:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]); // Викликаємо fetch при першому рендері та кожного разу, коли змінюється fetchVacancies

  // Функція для оновлення статусу вакансії
  const updateVacancyStatus = useCallback(async (id, isActive) => {
    try {
      const response = await fetch("/api/vacancies/toogle-active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive }),
      });

      const data = await response.json(); // Отримуємо відповідь сервера

      if (!response.ok) {
        console.error("Помилка оновлення:", data);
        throw new Error(data.error || "Помилка оновлення вакансії");
      }

      // Оновлюємо локальний стан
      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) =>
          vacancy._id === id ? { ...vacancy, isActive } : vacancy
        )
      );
    } catch (error) {
      setError("Помилка при оновленні вакансії");
      console.error("Помилка при оновленні вакансії:", error);
    }
  }, []);

  const deleteVacancy = useCallback(async (id) => {
    try {
      const response = await fetch("/api/vacancies/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Помилка видалення:", data);
        throw new Error(data.error || "Помилка видалення вакансії");
      }

      // Оновлюємо локальний стан
      setVacancies((prevVacancies) =>
        prevVacancies.filter((vacancy) => vacancy._id !== id)
      );
    } catch (error) {
      setError("Помилка при видаленні вакансії");
      console.error("Помилка при видаленні вакансії:", error);
    }
  }, []);

  return (
    <VacanciesContext.Provider
      value={{
        vacancies,
        updateVacancyStatus,
        deleteVacancy,
        isLoading,
        error,
        fetchVacancies,
      }}
    >
      {children}
    </VacanciesContext.Provider>
  );
};

export const useVacanciesContext = () => useContext(VacanciesContext);
