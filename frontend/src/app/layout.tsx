import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sembako Store - Toko Sembako Online",
  description: "Platform e-commerce untuk UMKM toko sembako. Belanja kebutuhan pokok dengan mudah dan terpercaya.",
  keywords: "sembako, toko online, UMKM, belanja, kebutuhan pokok, beras, gula, minyak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
