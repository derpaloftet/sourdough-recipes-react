import Navbar from './Navbar.tsx'
import Footer from './Footer'
import {Link, Outlet} from "react-router-dom"


export default function Layout() {
  return (
    <>
      <h1>The World of Sourdough</h1>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}