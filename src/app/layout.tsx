import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bardebabi | Cocktails, musique et moments à partager",
  description: "Bardebabi, bar lounge : cocktails, musique, soirées et moments à partager. Démonstration en cours de préparation.",
  applicationName: "Bardebabi",
  openGraph: { title: "Bardebabi | Bar lounge", description: "Cocktails, musique et moments à partager.", type: "website", locale: "fr_FR" },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
