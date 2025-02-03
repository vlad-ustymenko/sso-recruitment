import styles from "./TabArrow.module.css";

const TabArrow = ({ open }) => {
  return (
    <div className={styles.icon}>
      <span
        className={
          open ? `${styles.icon__left} ${styles.open}` : styles.icon__left
        }
      ></span>
      <span
        className={
          open ? `${styles.icon__right} ${styles.open}` : styles.icon__right
        }
      ></span>
    </div>
  );
};

export default TabArrow;
