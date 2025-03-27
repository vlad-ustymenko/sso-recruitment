import Footer from "@/shared/components/Footer/Footer";
import Header from "@/shared/components/Header/Header";
import styles from "./not-found.module.css";
import Menu from "@/shared/components/Menu/Menu";
import Modal from "@/shared/components/Modal/Modal";

export default function NotFound() {
  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        <h1 className={styles.title}>Сторінку не знайдено</h1>
        <p>На жаль, сторінки, яку ви шукаєте, не існує.</p>
        <a href="/" className={styles.link}>
          Повернутись на головну
        </a>
      </main>
      <Footer />
      <Menu />
      <Modal />
    </>
  );
}
