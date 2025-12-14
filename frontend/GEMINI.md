## このプロジェクトの概要
- 街中で見かけた猫の情報を写真とともに投稿し，地図上で共有できるウェブアプリケーション
- 利用者が投稿した猫の写真と位置情報を地図上にピンとして表示し，クリックすると撮影日時や簡単なコメントを閲覧できる仕組みを基本とする
- 投稿を新着順で表示するタイムライン機能も用意する
- 主にスマートフォン向けにUIを作る

## 目的
このリポジトリ（`digital-contents/frontend`）で役立つ AI コーディングエージェント向けの短い行動指針。

## すぐに押さえるべき「大まかな設計」
- フロントエンドは Next.js (app router) を使った単一の Next.js アプリ (`frontend/`)。
- UI は React + TypeScript + Tailwind CSS（DaisyUI）で書かれている。主要なコンポーネントは `frontend/src/app/components/`。
- バックエンドは **Supabase** を使用。Firebaseからの移行中。
  - Supabaseクライアントは `frontend/src/lib/supabase/` に集約。Client/Server Components両対応 (`@supabase/ssr`)。
- 地図機能は `frontend/src/app/components/Map.tsx` に実装。Google Maps JS API を使用。

## 開発ワークフロー（必須コマンド）
- ルート作業ディレクトリ: `frontend/`
- インストール: `npm install`
- 開発サーバー: `npm run dev`
- ビルド: `npm run build`
- ラン: `npm run start`

注: Node.js v24 系、npm 10 以上を想定。環境変数は `.env.local` に置く。

## 環境変数（コードで参照されているキー）
### Supabase (移行先・メイン)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Firebase (移行元・残存)
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

重要: `.env.local` に秘密情報をコミットしないこと。

## コードベースの重要なファイル（参照例）
- `frontend/src/lib/supabase/client.ts` — Supabase Client Components 用クライアント
- `frontend/src/lib/supabase/server.ts` — Supabase Server Components 用クライアント
- `frontend/src/lib/firebase.ts` — Firebase 初期化（移行元）
- `frontend/src/app/layout.tsx` — ルートレイアウト
- `frontend/src/app/page.tsx` — トップページ（メインコンポーネントの配置）
- `frontend/src/app/components/` — UIコンポーネント群
- `frontend/package.json` — スクリプトと依存の参照

## プロジェクト特有の注意点 / 差分
- **Supabaseへの移行中**: 新機能の実装や既存機能の改修は、原則としてSupabaseをベースに行う。Firebase関連のコードは今後削除される可能性がある。
- Tailwind + DaisyUI のユーティリティクラスが UI の中心。小さな UI 変更はクラス名の追記で済むことが多い。

## AI が行うべき具体的な初アクション（優先度順）
1. `frontend/src/lib/supabase/client.ts` および `server.ts` を参照し、Supabaseクライアントのセットアップ方法を理解する。
2. 必要な env キー (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) が `.env.local` にあるか確認する。値はダミーで良い（決して実鍵を生成・記録しない）。
3. UI コンポーネントを追加・編集する際は `frontend/src/app/components/` に置き、Tailwind のユーティリティを使う。

## コミット・ブランチのルール
- ブランチ命名: `feature/xxx` / `fix/xxx` を使用
  - `xxx` は取り組むissue番号とする

## 出力フォーマットの指示
- コード以外で出力する文章は日本語で出力を行う
- 変更箇所を最小に保つ。
- 環境変数やシークレットに関する変更は、必ずドキュメントと合わせて更新する。

## 現在のテーブル構造

Table users {
  user_id int [pk]
  name varchar
  email varchar
  address varchar
  password varchar
}

Table posts {
  post_id int [pk]
  user_id int [ref: > users.user_id]
  post_date datetime
  latitude double      // 旧 ido
  longitude double     // 旧 keido
  image text
  caption text
}

Table favorites {        // 投稿のお気に入り
  user_id int [ref: > users.user_id]
  post_id int [ref: > posts.post_id]
  date datetime
  indexes {
    (user_id, post_id) [pk]
  }
}

Table comments {         // コメント本体
  comment_id int [pk]
  post_id int [ref: > posts.post_id]
  user_id int [ref: > users.user_id]
  comment text
  created_at datetime
  like_value int         // ← コメントのいいね数を可視化
}

Table comment_favorites {     // コメントのいいね実体
  user_id int [ref: > users.user_id]
  comment_id int [ref: > comments.comment_id]
  date datetime
  indexes {
    (user_id, comment_id) [pk]
  }
}