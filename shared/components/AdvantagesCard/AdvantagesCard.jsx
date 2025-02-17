import React from "react";
import styles from "./AdvantagesCard.module.css";

const AdvantagesCard = ({ card }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.icon}>{card.icon}</div>
      <h3 className={styles.title}>{card.title}</h3>
      <p className={styles.description}>{card.description}</p>
    </div>
  );
};

export default AdvantagesCard;
