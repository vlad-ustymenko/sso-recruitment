"use client";
import { createContext, useContext, useState } from "react";

const FormModalContext = createContext();

export const FormModalProvider = ({ children }) => {
  const [activeFormModal, setActiveFormModal] = useState(false);

  return (
    <FormModalContext.Provider value={{ activeFormModal, setActiveFormModal }}>
      {children}
    </FormModalContext.Provider>
  );
};

export const useFormModalContext = () => useContext(FormModalContext);
