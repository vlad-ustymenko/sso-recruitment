import React from "react";
import Image from "next/image";
import styles from "./AdvantagesCard.module.css";

const AdvantagesCard = ({ card }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.icon}>
        <Image src={card.imgSrc} alt={card.title} width={26} height={26} />
      </div>
      <h3 className={styles.title}>{card.title}</h3>
      <p className={styles.description}>{card.description}</p>
    </div>
  );
};

export default AdvantagesCard;
