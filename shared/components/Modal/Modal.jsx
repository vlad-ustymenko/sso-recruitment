"use client";
import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import { X } from "lucide-react";
import { useModalContext } from "../../../context/ModalContext";

const Modal = ({ isFormModal, isSendMailModal }) => {
  const {
    activeFormModal,
    setActiveFormModal,
    activeSendMailModal,
    setActiveSendMailModal,
  } = useModalContext();

  // Блокування скролу при відкритті будь-якої модалки
  useEffect(() => {
    const isModalOpen = activeFormModal || activeSendMailModal;
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "";
  }, [activeFormModal, activeSendMailModal]);

  // Якщо жодна з модалок не активна, нічого не рендеримо
  if (!activeFormModal && !activeSendMailModal) return null;

  return (
    <div className={`${styles.formModalBG} ${styles.activeFormModalBG}`}>
      <div className={styles.formModalContainer}>
        {activeFormModal && <ApplicationForm />}
        {activeSendMailModal && (
          <div className={styles.mailContentWrapper}>
            <div className={styles.mailContent}>
              <h2 className={styles.title}>Заявка надіслана</h2>
              <p className={styles.contactText}>
                Дякуємо вам! В найближчий час ми зконтактуємо з вами.
              </p>
              <p className={styles.shareText}>
                Ви можете поділитися інформацією про наші соц мережі щоб зробити
                нас ще сильнішими!
              </p>
            </div>
          </div>
        )}

        <X
          className={styles.closeBTN}
          onClick={() => {
            setActiveFormModal(false);
            setActiveSendMailModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Modal;
