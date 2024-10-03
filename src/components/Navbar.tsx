import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
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
                   className="nav-item">
                    Home
          </NavLink>
          <NavLink to="/recipes"
                   className="nav-item">
                    Recipes
          </NavLink>
          <NavLink to="/add-recipes"
                   className="nav-item">
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