import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bardebabi | Bar & moments à partager",
  description: "Découvrez Bardebabi, un lieu de rencontres, de cocktails et de musique. Site de démonstration.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
