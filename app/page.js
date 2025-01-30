import Image from "next/image";
import styles from "./page.module.css";
import BeforeAfter from "@/shared/components/BeforeAfter/BeforeAfter";
import VacanciesPrewiev from "@/shared/sections/VacanciesPreview/VacanciesPreview";

export default function Home() {
  return (
    <div>
      <BeforeAfter beforeImage="/before.png" afterImage="/after.png" />
      <VacanciesPrewiev />
    </div>
  );
}
