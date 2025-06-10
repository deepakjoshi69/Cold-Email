import { Inter } from "next/font/google"
import "../styles/globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "../components/Header"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ClerkProvider
          
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
        >
          <Header/>
          <Toaster position="top-center" richColors closeButton/>
          {children}
        </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
