import Navbar from './Navbar.tsx'
import Footer from './Footer'
import { Outlet } from "react-router-dom"


export default function Layout() {
  return (
    <div className="site-wrapper">
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}