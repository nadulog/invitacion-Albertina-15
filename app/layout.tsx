import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bloomdate-albertina15.netlify.app"),
  title: "Albertina — Mis XV",
  description: "¡Te invito a compartir una noche muy especial conmigo! ✨",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Albertina — Mis XV",
    description: "¡Te invito a compartir una noche muy especial conmigo! ✨",
    url: "/",
    siteName: "Albertina — Mis XV",
    locale: "es_AR",
    images: [{ url: "/og-whatsapp.png?v=2", width: 1536, height: 1024, alt: "Albertina — Mis XV" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Albertina — Mis XV", description: "¡Te invito a compartir una noche muy especial conmigo! ✨", images: ["/og-whatsapp.png?v=2"] },
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
