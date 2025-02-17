"use client";
import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import Facebook from "../../../src/assets/socialIcon/facebook.svg";
import Telegram from "../../../src/assets/socialIcon/telegram.svg";
import { X } from "lucide-react";
import { useModalContext } from "../../../context/ModalContext";

const Modal = ({ isFormModal, isSendMailModal }) => {
  const {
    activeFormModal,
    setActiveFormModal,
    activeSendMailModal,
    setActiveSendMailModal,
  } = useModalContext();

  useEffect(() => {
    const isModalOpen = activeFormModal || activeSendMailModal;
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "";
  }, [activeFormModal, activeSendMailModal]);

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
                Ви можете підписатися на наші соц мережі щоб зробити нас ще
                сильнішими!
              </p>
              <div className={styles.buttonsWrapper}>
                <a
                  href="https://t.me/recruiting_sofua"
                  target="_blank"
                  className={styles.button}
                >
                  <Telegram className={styles.icon} fill="currentColor" />
                  <div>Telegram</div>
                </a>
                <a
                  href="https://www.facebook.com/sofua.army/"
                  target="_blank"
                  className={styles.button}
                >
                  <Facebook
                    width={20}
                    height={20}
                    className={styles.icon}
                    fill="currentColor"
                  />
                  <div>Facebook</div>
                </a>
              </div>
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
