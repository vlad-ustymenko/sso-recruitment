"use client";
import React, { useEffect } from "react";
import styles from "./FormModal.module.css";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import { X } from "lucide-react";
import { useFormModalContext } from "../../../context/FormModalContext";

const FormModal = () => {
  const { activeFormModal, setActiveFormModal } = useFormModalContext();

  useEffect(() => {
    if (activeFormModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [activeFormModal]);
  return (
    <div
      className={`${styles.formModalBG} ${
        activeFormModal && styles.activeFormModalBG
      }`}
    >
      <div className={styles.formModalContainer}>
        <ApplicationForm />
        <X
          className={styles.closeBTN}
          onClick={() => setActiveFormModal(false)}
        />
      </div>
    </div>
  );
};

export default FormModal;
