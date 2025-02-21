// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { MenuProvider } from "../context/MenuContext";
import { VacanciesProvider } from "@/context/VacanciesContext";
import { ModalProvider } from "@/context/ModalContext";
import Script from "next/script";

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
  title: "Рекрутинг Сил спеціальних операцій.",
  description: "Звичайні люди. Надзвичайні задачі.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    metadataBase: new URL("https://sofua.army/"),
    title: "Рекрутинг Сил спеціальних операцій.",
    description: "Звичайні люди. Надзвичайні задачі.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Рекрутинг Сил спеціальних операцій.",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <MenuProvider>
        <ModalProvider>
          <VacanciesProvider>
            <body
              className={`${UAFBold.className} ${UAFSemiBold.className} ${UAFRegular.className}`}
              style={{ position: "relative" }}
            >
              {children}
            </body>
          </VacanciesProvider>
        </ModalProvider>
      </MenuProvider>
    </html>
  );
}
