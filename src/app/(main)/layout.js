import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import PlayerBar from "@/components/PlayerBar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#080607]">
      <Header />

      <div className="flex min-h-[calc(100vh-72px)]">
        <Sidebar />

        <main className="min-w-0 flex flex-1 flex-col lg:ml-[260px]">
          <div className="flex-1">{children}</div>

          <Footer />
        </main>
      </div>

      <PlayerBar />
    </div>
  );
}
