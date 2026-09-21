import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import "swiper/css";
import { PlayerProvider } from "./context/PlayerContext";
import { Space_Grotesk } from "next/font/google";
import { SidebarProvider } from "./context/SidebarContext";
import { FavoriteProvider } from "./context/FavoritContext";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`min-h-full flex flex-col ${spaceGrotesk.variable}`}>
        <PlayerProvider>
          <AuthProvider>
            <FavoriteProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </FavoriteProvider>
          </AuthProvider>
        </PlayerProvider>
      </body>
    </html>
  );
}
