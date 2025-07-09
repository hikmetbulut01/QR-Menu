import "./globals.css"

export const metadata = {
  title: "Virtus Food",
  description: "Lezzetin QR Menüsü",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
