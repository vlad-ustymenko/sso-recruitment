import styles from "./Card.module.css";
import { Button } from "../Button/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

const Card = React.forwardRef(({ vacancie }, ref) => {
  const router = useRouter();
  return (
    <li ref={ref} className={`${styles.card} 'card`}>
      <div width={400} height={240} className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={vacancie.smallImage}
          width={420}
          height={240}
          alt={vacancie.title}
        ></Image>
        <Image
          className={styles.icon}
          src={vacancie.iconImage}
          width={30}
          height={30}
          alt="Millitary unit icon"
        ></Image>
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
