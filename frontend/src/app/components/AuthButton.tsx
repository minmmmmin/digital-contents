"use client";

import Link from "next/link";

type Props = {
  user: any; // SupabaseのUserオブジェクトの型
};

export default function AuthButton({ user }: Props) {
  return (
    <>
      {user ? (
        <Link href="/user-settings">
          <div className="avatar">
            <div className="w-9 h-9 rounded-full ring ring-gray-300 cursor-pointer">
              {/* ここにユーザーアイコンを表示する。今回は仮で何も表示しない */}
            </div>
          </div>
        </Link>
      ) : (
        <Link href="/login" className="btn btn-primary btn-sm">
          ログイン
        </Link>
      )}
    </>
  );
}
