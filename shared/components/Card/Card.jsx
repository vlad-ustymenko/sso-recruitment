import styles from "./Card.module.css";
import { Button } from "../Button/Button";
import Image from "next/image";
import React from "react";

const Card = React.forwardRef(({ vacancy }, ref) => {
  return (
    <li ref={ref} className={`${styles.card} 'card`}>
      <Image
        src={vacancy.image}
        alt={vacancy.title}
        width={400}
        height={250}
        className={styles.image}
      />
      <h3 className={styles.title}>{vacancy.title}</h3>
      <p className={styles.unit}>{vacancy.unit}</p>
      <Button className={styles.detailsButton} title="Детальніше">
        ДЕТАЛЬНІШЕ
      </Button>
    </li>
  );
});

export { Card };
