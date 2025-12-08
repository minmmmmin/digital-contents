import type { Metadata } from "next";
import { Yusei_Magic, Geist_Mono } from "next/font/google";
import "./globals.css";

const yusei_magic = Yusei_Magic({
  weight: "400",
  variable: "--font-yusei-magic",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ねこあるき",
  description: "地域の猫スポットを共有しよう",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${yusei_magic.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
