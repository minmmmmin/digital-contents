"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import SelectableMap from "./SelectableMap";
import Button from "./Button";
import { compressImage } from "@/lib/image/compressImage";
import { createPost } from "@/lib/posts/createPosts";



type PostFormProps = {
  onClose?: () => void; // モーダルを閉じるための関数
};

export default function PostForm({ onClose }: PostFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // 画像プレビュー表示のためのURL生成
  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // 画像圧縮
  const handleImageSelect = async (f: File | null) => {
    if (!f) {
      setFile(null);
      return;
    }
    try {
      const compressed = await compressImage(f);
      setFile(compressed);
    } catch (e) {
      console.error(e);
      alert("画像の圧縮に失敗しました");
    }
  };

  const handleSubmitPost = async () => {
    try {
      if (!file) {
        alert("画像を選択してください");
        return;
      }

      if (!comment.trim()) {
        alert("コメントを入力してください");
        return;
      }

      if (!location) {
        alert("位置情報を選択してください");
        return;
      }

      await createPost({
        caption: comment,
        latitude: location.lat,
        longitude: location.lng,
        imageFile: file,
      });


      alert("投稿しました");

      // 状態リセット（任意だが強くおすすめ）
      setComment("");
      setLocation(null);
      setFile(null);

      onClose?.();
    } catch (e) {
      console.error(e);
      alert(
        e instanceof Error ? e.message : "投稿に失敗しました"
      );
    }
  };


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
                handleImageSelect(f);
              }}
            />
            <span>画像をアップロードする</span>
          </label>

          <div className="mt-6">
            {previewUrl ? (
              <div className="relative w-full max-w-full h-56 md:h-72 bg-gray-100 border rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src={previewUrl}
                  alt="preview"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                  unoptimized
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
            <SelectableMap
              value={location}
              onChange={setLocation}
            />
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
            <button
              type="button"
              className="btn btn-primary rounded-full px-6 py-3 shadow-sm"
              onClick={handleSubmitPost}
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <span>投稿する</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
