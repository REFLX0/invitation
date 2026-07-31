import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond, Great_Vibes, Montserrat, Cinzel, Amiri, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const greatVibes = Great_Vibes({ variable: "--font-great-vibes", subsets: ["latin"], weight: "400", display: "swap", preload: true });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap", preload: true });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap", preload: true });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: true });
const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: ["400", "700"], display: "swap", preload: true });
const dancingScript = Dancing_Script({ variable: "--font-dancing", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", preload: true });

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Daawa — Invitations de mariage tunisiennes",
  description: "Creez des invitations de mariage digitales uniques avec nos modeles tunisiens elegants. Classique, Premium ou Luxe — votre invitation parfaite en quelques minutes.",
  keywords: ["Daawa", "invitation mariage", "Tunisie", "mariage tunisien", "invitation digitale", "RSVP en ligne", "carte d'invitation", "mariage"],
  authors: [{ name: "Daawa" }],
  icons: { icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg" },
  openGraph: { title: "Daawa — Invitations de mariage tunisiennes", description: "Creez des invitations de mariage digitales uniques avec nos modeles tunisiens elegants.", siteName: "Daawa", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${cormorant.variable} ${montserrat.variable} ${cinzel.variable} ${amiri.variable} ${dancingScript.variable} antialiased bg-[var(--daawa-cream)]/30 text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
