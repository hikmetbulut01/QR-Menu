import "./globals.css"

export const metadata = {
  title: "Virtus Food",
  description: "Lezzetin QR Menüsü",
    generator: 'Virtus Ar-Ge'
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
