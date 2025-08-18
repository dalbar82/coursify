import TopNav from "../components/TopNav"
import './globals.css'
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "../context/authContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastContainer/>
          <TopNav/>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}