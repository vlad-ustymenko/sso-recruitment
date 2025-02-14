"use client";
import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Checkbox from "../../../src/assets/checkbox.svg";
// import VerticalCarousel from "@/shared/components/VerticalCarousel/VerticalCarousel";
import BrFromater from "@/shared/components/BrFormater/BrFromater";
import { useModalContext } from "../../../context/ModalContext";
import styles from "./ApplicationForm.module.css";
const ApplicationForm = ({ title, vacancies }) => {
  const [sending, setSending] = useState(false);
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const { setActiveFormModal, activeSendMailModal, setActiveSendMailModal } =
    useModalContext();

  const formRef = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!activeCheckbox) {
      alert("Ви повинні погодитися на обробку персональних даних!");
      return;
    }

    try {
      setSending(true);
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

      {/*  Форма */}
      <form
        ref={formRef}
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Поле імені */}
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

        {/* Поле email */}
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

        {/* Поле телефону */}
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
                value: /^[0-9]{10}$/,
                message: "Номер телефону повинен містити 10 цифр",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                className={styles.input}
                id="phone"
                autoComplete="phone"
                type="tel"
                placeholder="Ваш номер телефону"
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  field.onChange(value);
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
