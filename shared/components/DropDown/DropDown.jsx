"use client";

import React, { useState } from "react";
import styles from "./DropDown.module.css";
import Arrow from "../Arrow/Arrow";

const DropDown = ({ list, title, selectTitle, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropDown}>
      <div
        className={styles.dropDownTitleWrapper}
        style={{ borderRight: title === "Вислуга років" && "none" }}
      >
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.selectWrapper} onClick={() => setOpen(!open)}>
          <div className={styles.select}>{selectTitle}</div>
          <Arrow open={open} />
        </div>
      </div>

      <ul className={`${styles.dropDownList} ${open && styles.dropDownActive}`}>
        {list.map((item) => (
          <li
            key={item}
            className={styles.dropDownListItem}
            onClick={() => {
              onChange(item);
              setOpen(false);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
