import styles from "./Card.module.css";
import { Button } from "../Button/Button";
import Image from "next/image";
import React from "react";

const Card = React.forwardRef(({ vacancie }, ref) => {
  return (
    <li ref={ref} className={`${styles.card} 'card`}>
      <Image
        src={vacancie.image}
        alt={vacancie.title}
        width={400}
        height={250}
        className={styles.image}
      />
      <h3 className={styles.title}>{vacancie.title}</h3>
      <p className={styles.unit}>{vacancie.unit}</p>
      <Button className={styles.detailsButton} title="Детальніше">
        ДЕТАЛЬНІШЕ
      </Button>
    </li>
  );
});

export { Card };
