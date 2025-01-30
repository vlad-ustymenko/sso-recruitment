import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/shared/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SSO Recruitment",
  description: "SSO Recruitment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ua">
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{position: 'relative',}} >
				<Header/>
        {children}
      </body>
    </html>
  );
}
