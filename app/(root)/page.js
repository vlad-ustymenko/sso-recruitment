import BeforeAfter from "@/shared/components/BeforeAfter/BeforeAfter";
import VacanciesPrewiev from "@/shared/sections/VacanciesPreview/VacanciesPreview";
import Advantages from "@/shared/sections/Advantages/Advantages";
import Tabs from "@/shared/components/Tabs/Tabs";
import AdmissionProcess from "@/shared/sections/AdmissionProcess/AdmissionProcess";
import ParallaxSection from "@/shared/sections/ParallaxSection/ParallaxSection";
import Contacts from "@/shared/sections/Contacts/Contacts";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import Calculator from "@/shared/sections/Calculator/Calculator";
import News from "@/shared/sections/News/News";
import styles from "./page.module.css";
import VerticalCarousel from "@/shared/components/VerticalCarousel/VerticalCarousel";
export default function Home() {
  return (
    <>
      <main>
        <BeforeAfter beforeImage="/before.png" afterImage="/after.png" />
        <VacanciesPrewiev title="Кого ми шукаємо?" filter />
        <Advantages />
        <Calculator />
        <Tabs />
        <ParallaxSection />
        <News />
        <AdmissionProcess />
        <div className={styles.yellowContainer}>
          <VerticalCarousel></VerticalCarousel>
          <ApplicationForm
            title="Перший шлях в ССО,& це заповнити заявку"
            vacancy="main"
          />
          <Contacts />
        </div>
      </main>
    </>
  );
}
