// import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/shared/components/Footer/Footer";
import Header from "@/shared/components/Header/Header";

export default function HomeLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
