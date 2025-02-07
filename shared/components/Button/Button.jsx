"use client";

import styles from "./Button.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Icon from "../../../src/assets/wolf.svg";

export function Button({
  title,
  onClick,
  logo,
  submit,
  bgcolor,
  arrow,
  arrowDirection,
  className,
}) {
  if (logo) {
    return (
      <button
        type={"button"}
        onClick={onClick}
        className={`${styles.buttonWithLogo} ${className} `}
      >
        {title}
        <Icon />
      </button>
    );
  }

  if (bgcolor) {
    return (
      <button
        type={"button"}
        onClick={onClick}
        className={`${styles.button} ${styles[bgcolor]}`}
      >
        {title}
      </button>
    );
  }

  if (arrow) {
    return (
      <button type={"button"} onClick={onClick} className={styles.arrowButton}>
        {arrowDirection === "left" ? (
          <ChevronLeft className={styles.arrow} width={32} height={32} />
        ) : (
          <ChevronRight className={styles.arrow} width={32} height={32} />
        )}
      </button>
    );
  }

  return (
    <button type={"button"} onClick={onClick} className={`${styles.button}`}>
      {title}
    </button>
  );
}
