// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { MenuProvider } from "../context/MenuContext";
import { VacanciesProvider } from "@/context/VacanciesContext";
import { FormModalProvider } from "@/context/FormModalContext";

const UAFBold = localFont({
  src: "../public/fonts/UAFSans-Bold.ttf",
  weight: "700",
  style: "normal",
  display: "swap",
});

const UAFSemiBold = localFont({
  src: "../public/fonts/UAFSans-SemiBold.ttf",
  weight: "600",
  style: "normal",
  display: "swap",
});

const UAFRegular = localFont({
  src: "../public/fonts/UAFSans-Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata = {
  title: "SSO Recruitment",
  description: "SSO Recruitment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <MenuProvider>
        <FormModalProvider>
          <VacanciesProvider>
            <body
              className={`${UAFBold.className} ${UAFSemiBold.className} ${UAFRegular.className}`}
              style={{ position: "relative" }}
            >
              {children}
            </body>
          </VacanciesProvider>
        </FormModalProvider>
      </MenuProvider>
    </html>
  );
}
