// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/components/Header/Header";
import localFont from "next/font/local";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
      <body
        className={`${UAFBold.className} ${UAFSemiBold.className} ${UAFRegular.className}`}
        style={{ position: "relative" }}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
