import styles from "./Card.module.css";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const Card = React.forwardRef(({ vacancie }, ref) => {
  const router = useRouter();
  return (
    <li ref={ref} className={`${styles.card} 'card`}>
      <div
        width={400}
        height={250}
        className={styles.image}
        style={{ backgroundImage: `url(${vacancie.smallImage})` }}
      >
        <div
          className={styles.icon}
          style={{ backgroundImage: `url(${vacancie.iconImage})` }}
        ></div>
      </div>
      <h3 className={styles.title}>{vacancie.title}</h3>
      <p className={styles.unit}>{vacancie.militaryUnit}</p>
      <Button
        className={styles.button}
        title="Детальніше"
        onClick={() => {
          router.push(`/vacancy/${vacancie.slug}`);
        }}
      >
        ДЕТАЛЬНІШЕ
      </Button>
    </li>
  );
});

export { Card };
