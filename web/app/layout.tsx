import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18NServer } from "./components/i18n-server";
import { getLocaleOnServer } from "@/i18n/server";
import type { Locale } from "@/i18n/language";
import i18nConfig from "@/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeanyAI",
  description: "LeanyAI Web Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 直接获取服务器默认语言（英语）
  let serverLocale: Locale;
  try {
    serverLocale = await getLocaleOnServer();
    console.log('[Layout] Server locale:', serverLocale);
  } catch (e) {
    console.error('[Layout] Error getting locale:', e);
    serverLocale = i18nConfig.defaultLocale as Locale;
  }
  
  return (
    <html lang={serverLocale} className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <I18NServer locale={serverLocale}>
          {children}
        </I18NServer>
      </body>
    </html>
  );
}
