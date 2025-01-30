import styles from './CardContent.module.css';
export function CardContent({ children }) {
  return <div className={styles.cardContent}>{children}</div>;
}
