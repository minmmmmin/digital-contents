"use client";

import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MainMenu({ open, onClose }: Props) {
  const router = useRouter();

  const go = (path: string) => {
    router.push(path);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <aside
        className="fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg p-4 z-50 flex flex-col gap-3"
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <h2 className="text-xl font-bold mb-4">メインメニュー</h2>

        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => go("/")}
        >
          ホーム
        </button>
        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => go("/")}
        >
          投稿する
        </button>
        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => go("/")}
        >
          個人設定
        </button>
        <button
          className="btn btn-outline btn-sm justify-start"
          onClick={() => go("/")}
        >
          使い方
        </button>
      </aside>
    </>
  );
}
