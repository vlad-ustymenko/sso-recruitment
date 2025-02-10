import Image from "next/image";
import styles from "./page.module.css";
import BeforeAfter from "@/shared/components/BeforeAfter/BeforeAfter";
import VacanciesPrewiev from "@/shared/sections/VacanciesPreview/VacanciesPreview";
import Advantages from "@/shared/sections/Advantages/Advantages";
import Tabs from "@/shared/components/Tabs/Tabs";
import AdmissionProcess from "@/shared/sections/AdmissionProcess/AdmissionProcess";
import ParallaxSection from "@/shared/sections/ParallaxSection/ParallaxSection";
import Contacts from "@/shared/sections/Contacts/Contacts";
import VerticalCarousel from "@/shared/components/VerticalCarousel/VerticalCarousel";
import ApplicationForm from "@/shared/sections/ApplicationForm/ApplicationForm";
import Slider from "@/shared/components/Slider/Slider";
import Calculator from "@/shared/sections/Calculator/Calculator";
import News from "@/shared/sections/News/News";
export default function Home() {
  return (
    <>
      <main>
        <BeforeAfter beforeImage="/before.png" afterImage="/after.png" />
        <VacanciesPrewiev />
        <Advantages />
        <Calculator />
        <Tabs />
        <ParallaxSection />
        <News />
        <AdmissionProcess />
        <ApplicationForm />
        <Contacts />
      </main>
    </>
  );
}
