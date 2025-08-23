// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Philosopher's Sol",
  description: "Modern symposium: many lenses, never one decree.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@500;600&family=Spectral:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
      </head>
      <body className="body-symposium">{children}</body>
    </html>
  );
}
