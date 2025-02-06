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

export default function Home() {
  return (
    <>
      <main>
        <BeforeAfter beforeImage="/before.png" afterImage="/after.png" />
        <VacanciesPrewiev />
        <Advantages />
        <Tabs />
        <ParallaxSection />
        <AdmissionProcess />
        <VerticalCarousel></VerticalCarousel>
        <Contacts />
      </main>
    </>
  );
}
