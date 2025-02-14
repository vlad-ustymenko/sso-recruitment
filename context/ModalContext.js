"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeFormModal, setActiveFormModal] = useState(false);
  const [activeSendMailModal, setActiveSendMailModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        activeFormModal,
        setActiveFormModal,
        activeSendMailModal,
        setActiveSendMailModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
