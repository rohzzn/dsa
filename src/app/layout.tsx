import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DSA.gay",
  description: "Learn Data Structures and Algorithms",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}