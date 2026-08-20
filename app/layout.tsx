import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://albertina-mis-xv.sites.openai.com"),
  title: "Albertina — Mis XV",
  description: "Estás por entrar a mi noche. Sábado 17 de octubre de 2026.",
  openGraph: {
    title: "Albertina — Mis XV",
    description: "Estás por entrar a mi noche. Sábado 17 de octubre de 2026.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Albertina" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Albertina — Mis XV", description: "Estás por entrar a mi noche.", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
