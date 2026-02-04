import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CheckSalary - Kalkulator Wynagrodzeń B2B & UoP (Net Salary Poland)",
  description:
    "Darmowy kalkulator wynagrodzeń B2B i UoP. Oblicz zysk netto (Real Cash), uwzględnij koszty i ulgi podatkowe. Instant net salary calculator for Poland.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CheckSalary - Kalkulator B2B & UoP (Netto na rękę)",
    description:
      "Sprawdź ile realnie zarobisz na B2B i UoP. Uwzględnij koszty, ZUS i podatki. Prosty i szybki kalkulator dla branży IT i nie tylko.",
    siteName: "CheckSalary",
    locale: "pl_PL",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
