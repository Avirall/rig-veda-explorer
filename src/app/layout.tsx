import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veda in 60 Seconds - Ancient Wisdom in Modern Scroll",
  description: "Experience the Rig Veda through a cinematic scroll story. Discover dawn, mandalas, rishis, themes, chants, and ancient Sanskrit poetry in 60 seconds.",
  keywords: "Rig Veda, Sanskrit, ancient poetry, Vedic literature, Hindu scriptures, scroll story, cinematic experience, chant",
  authors: [{ name: "Rig Veda Explorer" }],
  openGraph: {
    title: "Veda in 60 Seconds - Ancient Wisdom in Modern Scroll",
    description: "Experience the Rig Veda through a cinematic scroll story. Discover dawn, mandalas, rishis, themes, chants, and ancient Sanskrit poetry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}