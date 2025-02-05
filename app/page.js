import Image from "next/image";
import styles from "./page.module.css";
import BeforeAfter from "@/shared/components/BeforeAfter/BeforeAfter";
import VacanciesPrewiev from "@/shared/sections/VacanciesPreview/VacanciesPreview";
import Advantages from "@/shared/sections/Advantages/Advantages";
import Tabs from "@/shared/components/Tabs/Tabs";
import AdmissionProcess from "@/shared/sections/AdmissionProcess/AdmissionProcess";
import Menu from "@/shared/components/Menu/Menu";

export default function Home() {
  return (
    <>
      <main>
        <BeforeAfter beforeImage="/before.png" afterImage="/after.png" />
        <VacanciesPrewiev />
        <Advantages />
        <Tabs />
        <AdmissionProcess />
      </main>
      <Menu />
    </>
  );
}
