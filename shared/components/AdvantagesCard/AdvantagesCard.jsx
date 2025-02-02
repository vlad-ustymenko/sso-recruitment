import React from "react";
import Image from "next/image";
import styles from "./AdvantagesCard.module.css";

const AdvantagesCard = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.icon}>
        <Image
          src="/images/icons/hands.png"
          alt="hands"
          width={26}
          height={26}
        />
      </div>
      <h3 className={styles.title}>Людяний підхід</h3>
      <p className={styles.description}>
        Людиноцентричний підхід, кваліфіковані та досвічені командири
      </p>
    </div>
  );
};

export default AdvantagesCard;
