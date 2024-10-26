import './styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">DiversityInsights</h1>
            </div>
          </header>
          <main className="flex-grow container mx-auto py-8">
            {children}
          </main>
          <footer className="bg-muted p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 DiversityInsights. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
