import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  return (
      <header className="navbar">
        <div className="logo">
          <Link to="/">logo</Link>
        </div>
        <nav>
          <NavLink to="/"
                   className="home">
            Home
          </NavLink>
          <NavLink to="/recipes"
                   className="home">
            Recipes
          </NavLink>
          <NavLink to="/add-recipes"
                   className="add-recipes">
            Add your Recipe
          </NavLink>
        </nav>
        <Link to="/login"
              className="login">
          Login
        </Link>
      </header>
  )
}