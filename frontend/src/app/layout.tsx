import type { Metadata } from "next";
import { Yusei_Magic, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutProvider from "./components/LayoutProvider";
import { createClient } from "@/lib/supabase/server";

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
  openGraph: {
    title: "ねこあるき",
    description: "地域の猫スポットを共有しよう",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 1200,
        alt: "ねこあるき",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ねこあるき",
    description: "地域の猫スポットを共有しよう",
    images: ["/ogp.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // public.usersにユーザーが存在するかチェック
    const { data: userProfile } = await supabase
      .from("users")
      .select("user_id")
      .eq("user_id", user.id)
      .single();

    // 存在しない場合、挿入する
    if (!userProfile) {
      const { error } = await supabase.from("users").insert({
        user_id: user.id,
        // ソーシャルログイン時の名前やアバターをuser.user_metadataから取得
        name: user.user_metadata.name || user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
      });
      if (error) {
        console.error("Error inserting new user into public.users:", error);
      }
    }
  }

  return (
    <html lang="ja">
      <body
        className={`${yusei_magic.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <LayoutProvider user={user}>{children}</LayoutProvider>
      </body>
    </html>
  );
}
