import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./Providers/ThemeProvider";
import StyledComponentsRegistry from "@/lib/registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salary Calculator",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <StyledComponentsRegistry>
        <ThemeProvider>
        <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </html>
  );
}
