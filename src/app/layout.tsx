import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dra. Carolina Mendes | Psicóloga Clínica",
  description: "Psicóloga Clínica especializada em Terapia Cognitivo-Comportamental. Atendimento online e presencial. Agende sua consulta.",
  keywords: ["psicóloga", "terapia", "saúde mental", "terapia online", "psicologia", "ansiedade", "depressão"],
  authors: [{ name: "Dra. Carolina Mendes" }],
  openGraph: {
    title: "Dra. Carolina Mendes | Psicóloga Clínica",
    description: "Psicóloga Clínica especializada em Terapia Cognitivo-Comportamental. Atendimento online e presencial.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Carolina Mendes | Psicóloga Clínica",
    description: "Psicóloga Clínica especializada em Terapia Cognitivo-Comportamental.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
