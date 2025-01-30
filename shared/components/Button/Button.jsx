
import styles from './Button.module.css';

export function Button({ children, onClick, className = '', type = 'button' }) {
  return (
    <button type={type} onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
}
