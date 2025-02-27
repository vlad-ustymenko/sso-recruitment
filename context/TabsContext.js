"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTabs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tabs`, { cache: "no-store" });
      const data = await res.json();
      setTabs(data);
    } catch (err) {
      setError("Помилка завантаження табів");
      console.error("Помилка завантаження табів:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTabs();
  }, [fetchTabs]);

  const deleteTab = useCallback(async (id) => {
    try {
      const response = await fetch("/api/tabs/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Помилка видалення:", data);
        throw new Error(data.error || "Помилка видалення таба");
      }

      setTabs((prevTabs) => prevTabs.filter((tab) => tab._id !== id));
    } catch (error) {
      setError("Помилка при видаленні таба");
      console.error("Помилка при видаленні таба:", error);
    }
  }, []);

  return (
    <TabsContext.Provider
      value={{
        tabs,
        deleteTab,
        isLoading,
        error,
        fetchTabs,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const useTabsContext = () => useContext(TabsContext);
