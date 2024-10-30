import { Link, NavLink } from "react-router-dom"
import { CSSProperties } from "react"

export default function Navbar() {
  const activeStyle: CSSProperties = {
    backgroundColor: "#F3F4F6",
    fontWeight: "bold",
    border: "2px solid #DCDCDC",
  }
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img className="navbar-img" src="/bread-logo.png" alt="Site Logo"/>
        </Link>
        <h1 className="navbar-header">The World of Sourdough</h1>
      </div>
      <nav className="navbar-menu">
        <NavLink to="/"
                 className="nav-item"
                 style={({isActive}): CSSProperties | undefined => isActive ? activeStyle : undefined}
        >
          Home
        </NavLink>
        <NavLink to="/recipes"
                 className="nav-item"
                 style={({isActive}): CSSProperties | null => isActive ? activeStyle : null}
        >
          Recipes
        </NavLink>
        <NavLink to="/add-recipes"
                 className="nav-item"
                 style={({isActive}): CSSProperties | null => isActive ? activeStyle : null}
        >
          Add Recipe
        </NavLink>
        <div className="login">
          <Link to="/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}