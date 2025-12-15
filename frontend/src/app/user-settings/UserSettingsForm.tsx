"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; // 追加
import { createClient } from "@/lib/supabase/client"; // 追加

// 仮のprofile型。実際のusersテーブルの型に合わせて調整してください。
type Profile = {
  name: string;
  avatar_url: string;
};

type Props = {
  user: User | null;
  profile: Profile | null;
  updateAction: (formData: FormData) => Promise<{ success: boolean; message: string }>;
};

const initialState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "更新中..." : "プロフィールを更新"}
    </button>
  );
}

export default function UserSettingsForm({ user, profile, updateAction }: Props) {
  const [responseState, setResponseState] = useState(initialState); // アクションの結果を保持するstate
  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); // 追加
  const supabase = createClient(); // 追加

  useEffect(() => {
    if (responseState.message) {
      setShowModal(true);
    }
  }, [responseState]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await updateAction(formData); // Server Actionを直接呼び出す
    setResponseState(result);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.assign("/login"); // ページをリロードしてリダイレクト
  };

  return (
    <>
      <form action={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            ユーザー名
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={profile?.name || ""}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="ねこマスター"
          />
        </div>
        <SubmitButton />
      </form>

      <div className="mt-8"> {/* 追加 */}
        <button className="btn btn-error" onClick={handleLogout}> {/* 追加 */}
          ログアウト
        </button>
      </div>

      {showModal && (
        <dialog id="result_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {responseState.success ? "成功" : "エラー"}
            </h3>
            <p className="py-4">{responseState.message}</p>
            <div className="modal-action">
              <button className="btn" onClick={handleCloseModal}>
                閉じる
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
