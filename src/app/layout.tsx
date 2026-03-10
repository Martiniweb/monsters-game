import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Шрифт Involve - добавьте файлы в /public/fonts/ и раскомментируйте:
// import localFont from "next/font/local";
// const involveFont = localFont({
//   src: [
//     { path: "../../public/fonts/Involve-Regular.ttf", weight: "400", style: "normal" },
//     { path: "../../public/fonts/Involve-Medium.ttf", weight: "500", style: "normal" },
//     { path: "../../public/fonts/Involve-SemiBold.ttf", weight: "600", style: "normal" },
//     { path: "../../public/fonts/Involve-Bold.ttf", weight: "700", style: "normal" },
//   ],
//   variable: "--font-involve",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Домашние монстры",
  description: "Веб-интерактив о домашних монстрах",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ background: 'rgba(225, 98, 26, 1)' }}>
      <body
        className="antialiased"
        style={{ 
          background: 'rgba(225, 98, 26, 1)', 
          minHeight: '100vh',
          fontFamily: 'Involve, sans-serif'
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
