import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { I18NServer } from "./components/i18n-server";
import { getLocaleOnServer } from "@/i18n/server";
import type { Locale } from "@/i18n/language";
import i18nConfig from "@/i18n/config";
import "./globals.css";
import Header from "./components/header";
import ThemeProvider from './providers/theme-provider';


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
        <ThemeProvider>
          <I18NServer locale={serverLocale}>
            <div className="flex flex-col min-h-screen bg-white text-gray-900">
              <Header />
              <main className="flex-1 p-6">
                {children}
              </main>
              <footer className="bg-gray-50 py-6 px-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} LeanyAI. All rights reserved.
              </footer>
            </div>
          </I18NServer>
        </ThemeProvider>
      </body>
    </html>
  );
}
