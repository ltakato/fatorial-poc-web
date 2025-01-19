import { Inter } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Metadata } from "next/types";

const fontInter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  robots: "all",
  title: "HireAI",
  icons: [{ rel: "icon", url: "favicon.ico" }],
  description: "HireAI, a nova forma de contratar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontInter.className} antialiased max-w-screen-xl mx-auto`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
