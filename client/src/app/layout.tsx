import TopNav from "../components/TopNav"
import './globals.css'
import { ToastContainer } from "react-toastify"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer/>
        <TopNav/>
        <main>{children}</main>
      </body>
    </html>
  )
}