import './globals.css'
import { Rubik } from 'next/font/google'

const font = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'RarBG.reloaded',
  description: 'Same site, new technologies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={font.className}>{children}</body>
    </html>
  )
}
