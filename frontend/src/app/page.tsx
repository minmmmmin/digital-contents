"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from "./components/Header";
import Map from "./components/Map"
import TabsBar from "./components/TabsBar";
import Timeline from "./components/Timeline";

export default function Home() {
  const [view, setView] = useState<'split' | 'map' | 'timeline'>('split'); // 'split', 'map', 'timeline'
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (searchParams.get('login') === 'success') {
      setShowSuccessModal(true);
      // URLからクエリパラメータを削除
      router.replace('/', { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col min-h-0">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            view === 'split' ? 'h-1/2' : view === 'map' ? 'flex-1' : 'h-0'
          }`}
        >
          <Map view={view} setView={setView} />
        </div>
        <div className={`${view === 'map' ? 'hidden' : ''}`}>
          <TabsBar />
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            view === 'split'
              ? 'flex-1 min-h-0'
              : view === 'timeline'
              ? 'flex-1 min-h-0'
              : 'h-0'
          }`}
        >
          <Timeline view={view} setView={setView} />
        </div>
      </div>

      {/* 右下の投稿ボタン */}
      <button
        onClick={() => router.push("/post")}
        className=" fixed right-6 bottom-6 z-50 btn btn-primary flex items-center gap-2 px-5 py-4 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
      </button>

      {/* ログイン成功モーダル */}
      {showSuccessModal && (
        <dialog id="login_success_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">お知らせ</h3>
            <p className="py-4">ログインしました。</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowSuccessModal(false)}>閉じる</button>
            </div>
          </div>
        </dialog>
      )}
    </main>
  );
}
