"use client";

import { useState, useEffect } from "react";
import Map from "./Map";
import Button from "./Button";

type PostFormProps = {
  onClose?: () => void; // モーダルを閉じるための関数
};

export default function PostForm({ onClose }: PostFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  // 画像プレビュー表示のためのURL生成
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="flex flex-col h-full bg-white rounded-lg">
      <div className="flex-1 px-5 pt-6 pb-4 overflow-y-auto">
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">写真</h2>
          <label className="inline-flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer select-none text-sm shadow-sm hover:shadow-md">
            <input
              type="file"
              accept="image/*;capture=camera"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0] ?? null;
                setFile(f);
              }}
            />
            <span>画像をアップロードする</span>
          </label>

          <div className="mt-6">
            {previewUrl ? (
              <div className="w-full max-w-full h-56 md:h-72 bg-gray-100 border rounded-md overflow-hidden flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="w-full h-56 md:h-72 bg-gray-200 border rounded-md flex items-center justify-center text-gray-500">
                写真はここに表示されます
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">位置情報の追加</h2>
          <div className="w-full h-64 md:h-80 rounded-md overflow-hidden border">
            <Map />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">コメント</h2>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="コメントを入力して下さい。"
            className="w-full h-28 border rounded-md p-3 resize-none"
          />
        </section>
      </div>

      <div className="px-5 pb-6 border-t pt-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            type="button"
            className="btn rounded-full px-6 py-3 shadow-sm"
            onClick={onClose} // onCloseを呼び出す
          >
            下書きを保存
          </button>

          <div>
            <Button>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>投稿する</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
