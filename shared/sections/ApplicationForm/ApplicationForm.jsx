"use client";
import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "../../../src/assets/checkbox.svg";
import BrFromater from "@/shared/components/BrFormater/BrFromater";
import { useModalContext } from "../../../context/ModalContext";
import IMask from "imask";
import styles from "./ApplicationForm.module.css";

const ApplicationForm = ({ title, vacancy }) => {
  const [sending, setSending] = useState(false);
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const { setActiveFormModal, activeSendMailModal, setActiveSendMailModal } =
    useModalContext();

  const formRef = useRef(null);
  const phoneInputRef = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (phoneInputRef.current) {
      IMask(phoneInputRef.current, {
        mask: "+38 (000) 000-00-00",
        placeholder: "_",
      });
    }
  }, []);

  const onSubmit = async (data) => {
    if (!activeCheckbox) {
      alert("Ви повинні погодитися на обробку персональних даних!");
      return;
    }

    try {
      setSending(true);
      const formData = { ...data, vacancy };
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setActiveSendMailModal(true);
        reset();
        setActiveCheckbox(false);
        setActiveFormModal(false);
      } else {
        alert("Помилка при відправці форми.");
      }
    } catch (error) {
      console.error("Помилка:", error);
      alert("Щось пішло не так. Спробуйте пізніше.");
      setActiveFormModal(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      {title && (
        <h2 className={styles.formTitle} style={{}}>
          {<BrFromater text={title} />}
        </h2>
      )}

      <form
        ref={formRef}
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={`${styles.inputWrapper} ${errors.name && styles.required}`}
        >
          <label className={styles.label} htmlFor="name">
            Ім’я та прізвище
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Це поле обов’язкове",
              pattern: {
                value: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ' ]+$/,
                message: "Ім’я повинно містити тільки літери",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                className={styles.input}
                id="name"
                autoComplete="name"
                placeholder="Ваше ім’я та прізвище"
                onChange={(e) => {
                  const value = e.target.value.replace(
                    /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ' ]/g,
                    ""
                  );
                  field.onChange(value);
                }}
              />
            )}
          />
        </div>

        <div
          className={`${styles.inputWrapper} ${
            errors.email && styles.required
          }`}
        >
          <label className={styles.label} htmlFor="email">
            E-mail
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Це поле обов’язкове",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Невірний формат email",
              },
            }}
            render={({ field }) => (
              <input
                className={styles.input}
                {...field}
                id="email"
                autoComplete="email"
                placeholder="Ваша електронна адреса"
              />
            )}
          />
        </div>

        <div
          className={`${styles.inputWrapper} ${
            errors.phone && styles.required
          }`}
        >
          <label className={styles.label} htmlFor="phone">
            Номер телефону
          </label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{
              required: "Це поле обов’язкове",
              pattern: {
                value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                message:
                  "Номер телефону повинен відповідати формату +38 (XXX) XXX-XX-XX",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                ref={phoneInputRef}
                className={styles.input}
                id="phone"
                autoComplete="phone"
                type="tel"
                placeholder="телефон"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
        </div>
      </form>

      <div className={styles.buttonWrapper}>
        <div className={styles.personalDataWrapper}>
          <div
            className={`${styles.personalDataCheckbox} ${
              activeCheckbox && styles.active
            }`}
            onClick={() => setActiveCheckbox(!activeCheckbox)}
          >
            {activeCheckbox && <Checkbox width={24} height={24} />}
          </div>
          <p className={styles.personalDataText}>
            Натискаючи кнопку відправити, ви даєте згоду
            <a href="#" className={styles.personalDataLink}>
              на обробку персональних даних.
            </a>
          </p>
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={() => handleSubmit(onSubmit)()}
          disabled={sending}
          style={{
            backgroundColor: sending && "gray",
          }}
        >
          {sending ? "Відправка..." : "Знайди свою зграю"}
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;
