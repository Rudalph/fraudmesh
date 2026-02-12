import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import "./globals.css";


const mavenpro = Maven_Pro({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Validium",
  description: "Real-Time ML-Powered Fraud Detection",
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
        {children}
      </body>
    </html>
  );
}
