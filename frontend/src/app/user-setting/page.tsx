import Header from "../components/Header";

export default function Usage() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <h2 className="text-2xl font-bold p-4">ユーザー設定（仮ページ）</h2>
      ユーザー設定ページでは、アカウント情報の変更や通知設定の管理ができます。
      <section className="px-4 py-2">
        <h3 className="text-xl font-semibold mb-2">アカウント情報の変更方法</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>「プロフィール編集」ボタンをクリックします。</li>
          <li>表示されるフォームに新しい情報を入力します。</li>
          <li>「保存」ボタンをクリックして変更を確定します。</li>
        </ol>
      </section>
      <section className="px-4 py-2">
        <h3 className="text-xl font-semibold mb-2">通知設定の管理方法</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>「通知設定」セクションに移動します。</li>
          <li>受け取りたい通知の種類を選択または解除します。</li>
          <li>「保存」ボタンをクリックして設定を更新します。</li>
        </ol>
      </section>
    </main>
  );
}
