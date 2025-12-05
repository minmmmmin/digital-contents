import Header from "../components/Header";

export default function Usage() {
  return (
    <main className="flex flex-col h-screen">
      <Header />

      <h2 className="text-2xl font-bold p-4">使い方（仮ページ）</h2>
      ねこあるきは、猫の写真を投稿して共有するアプリです。
      <section className="px-4 py-2">
        <h3 className="text-xl font-semibold mb-2">写真の投稿方法</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>「投稿」ページに移動します。</li>
          <li>「画像をアップロードする」ボタンをクリックして、猫の写真を選択します。</li>
          <li>コメント欄に写真の説明やエピソードを入力します。</li>
          <li>「投稿する」ボタンをクリックして、写真を共有します。</li>
        </ol>
      </section>

      <section className="px-4 py-2">
        <h3 className="text-xl font-semibold mb-2">写真の閲覧方法</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>「ホーム」ページに移動します。</li>
          <li>投稿された猫の写真が一覧で表示されます。</li>
          <li>写真をクリックすると、詳細なコメントや位置情報が表示されます。</li>
        </ol>
      </section>
    </main>
  );
}