import Header from "./components/Header";
import Map from "./components/Map"
import TabsBar from "./components/TabsBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">
      <Header />
      <Map />
      <TabsBar />
    </main>
  );
}
