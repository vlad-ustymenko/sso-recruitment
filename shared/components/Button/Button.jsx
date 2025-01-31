import styles from "./Button.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Button({
  title,
  onClick,
  logo,
  bgcolor,
  arrow,
  arrowDirection,
}) {
  if (logo) {
    return (
      <button
        type={"button"}
        onClick={onClick}
        className={`${styles.buttonWithLogo}`}
      >
        {title}
        <svg
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.3776 23.6154L40.5 24.1758L38.5357 27.2582L36.5714 24.7362L39.3776 23.6154Z"
            fill="white"
          />
          <path
            d="M37.9745 22.7747L34.0459 24.1758L37.9745 28.6593L36.2908 31.1813L31.5305 25.5634C30.6711 24.5491 29.2943 24.1353 28.0171 24.5073L23.3827 25.8571L33.7653 33.4231L29.2755 36.7857L25.1156 32.9778C23.4595 31.4618 21.2945 30.6209 19.0479 30.6209H17.2092L19.7347 28.0989L25.1156 30.3406L25.9082 29.5L21.4184 26.1373L29.2755 17.7307L37.9745 22.7747Z"
            fill="white"
          />
          <path
            d="M26.4694 12.4066L28.9949 16.6099H26.75L26.1888 15.7692H18.6122L14.9643 13.2472L17.4898 16.8901H6.82653L4.86225 13.8077H11.3163L10.7551 12.967H5.9847L3.45919 9.32415H10.4745C8.54721 7.2246 7.80391 4.29921 8.49567 1.53607L8.79082 0.357117L16.648 8.48349L22.8214 12.4066H26.4694Z"
            fill="white"
          />
          <path
            d="M2.33674 18.5714H19.4541L21.1378 19.6923L19.7347 17.4505L24.5051 20.5329L24.2245 20.8132L13.5612 32.5824H7.94898L14.6837 26.1373L13.8418 25.8571L7.38776 31.1813L2.33674 30.0604L11.3163 24.1758H9.63265L4.58163 27.2582L1.21429 24.1758L7.38776 22.4945V21.934H4.58163L2.33674 18.5714Z"
            fill="white"
          />
          <path
            d="M30.9071 26.8338C30.9124 26.8399 30.9177 26.8461 30.9229 26.8522L32.3927 28.5789L30.738 29.0296L30.9071 26.8338Z"
            fill="white"
          />
          <path
            d="M33.7653 30.1915L34.6071 31.1805L33.7653 31.811V30.1915Z"
            fill="white"
          />
          <path
            d="M32.6429 31.3985L30.9375 30.1371L32.6429 29.6726V31.3985Z"
            fill="white"
          />
          <path
            d="M29.603 29.1499L27.7751 27.7978L29.7681 27.0059L29.603 29.1499Z"
            fill="white"
          />
          <path
            d="M26.712 27.0114L25.9082 26.4168L28.1969 25.9271C28.5965 25.8415 29.002 25.8455 29.3876 25.9302L26.712 27.0114Z"
            fill="white"
          />
          <path
            d="M22.2602 17.4505H24.2245L25.3469 19.4121L22.2602 17.4505Z"
            fill="white"
          />
        </svg>
      </button>
    );
  }

  if (bgcolor) {
    return (
      <button
        type={"button"}
        onClick={onClick}
        className={`${styles.button} ${styles[bgcolor]}`}
      >
        {title}
      </button>
    );
  }

  if (arrow) {
    return (
      <button type={"button"} onClick={onClick} className={styles.arrowButton}>
        {arrowDirection === "left" ? (
          <ChevronLeft className={styles.arrow} width={32} height={32} />
        ) : (
          <ChevronRight className={styles.arrow} width={32} height={32} />
        )}
      </button>
    );
  }

  return (
    <button type={"button"} onClick={onClick} className={`${styles.button}`}>
      {title}
    </button>
  );
}
