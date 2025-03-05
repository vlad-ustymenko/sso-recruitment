// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

import Providers from "@/shared/components/Providers/Providers";
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
  metadataBase: new URL("https://sofua.army"),
  title: "Рекрутинг Сил спеціальних операцій.",
  description: "Звичайні люди. Надзвичайні задачі.",
  icons: "/favicon.png",
  openGraph: {
    title: "Рекрутинг Сил спеціальних операцій.",
    description: "Звичайні люди. Надзвичайні задачі.",
    images: [
      {
        url: "og-image.jpg",
        width: 1920,
        height: 1080,
        alt: "Рекрутинг Сил спеціальних операцій.",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M3KHTFHB');
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={`${UAFBold.className} ${UAFSemiBold.className} ${UAFRegular.className}`}
        style={{ position: "relative" }}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3KHTFHB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
