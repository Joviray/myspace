import AuthProvider from './AuthProvider'
import NavMenu from './NavMenu'
import './globals.css'
import { Inter } from 'next/font/google'
import {ToastContainer, toast  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gator Meet',
  description: 'Stay Productive, Stay Safe, Stay Connected',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
    <html lang="en">
      <body>
        <div className="container">
        <NavMenu />
        <ToastContainer />
        {children}
        </div>
        </body>
    </html>
    </AuthProvider>
  )
}
