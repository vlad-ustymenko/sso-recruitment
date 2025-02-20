"use client";

import React, { useEffect, useState } from "react";
import styles from "./DropDown.module.css";
import Arrow from "../Arrow/Arrow";

const DropDown = ({ list, title, selectTitle, onChange, disabled }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div className={styles.dropDown}>
      <div
        className={styles.dropDownTitleWrapper}
        style={{
          borderRight: title === "Вислуга років" && "none",
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "auto",
        }}
      >
        <h3 className={styles.title}>{title}</h3>
        <div
          className={styles.selectWrapper}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div
            className={styles.select}
            style={{
              color: selected && "black",
              fontFamily: selected && "UAFSemiBold",
            }}
          >
            {selectTitle}
          </div>
          <Arrow open={open} />
        </div>
      </div>

      <ul className={`${styles.dropDownList} ${open && styles.dropDownActive}`}>
        {list.map((item, index) => {
          const newKey = Object.keys(item)[0];
          return (
            <li
              key={newKey + index}
              className={styles.dropDownListItem}
              onClick={() => {
                onChange(item.name);
                setOpen(false);
                setSelected(true);
              }}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDown;
