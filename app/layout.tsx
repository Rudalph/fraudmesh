import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"

const mavenpro = Maven_Pro({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FraudMesh",
  description: "Real-Time AI-Powered Fraud Detection & Prevention Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={mavenpro.className}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
