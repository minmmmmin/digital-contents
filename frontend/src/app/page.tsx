// ここが大元
import Button from "../components/Button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold mb-4">ねこまっぷのもっくつくるよ</h1>
      <Button>投稿する</Button>
    </main>
  );
}
