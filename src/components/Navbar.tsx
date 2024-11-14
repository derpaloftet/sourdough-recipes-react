import { Link, NavLink } from "react-router-dom"

export default function Navbar() {
  function getClassName() {
    return ({ isActive }: { isActive: boolean }) =>
      isActive ? "nav-active nav-item " : "nav-item"
  }

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img className="navbar-img" src="/bread-logo.png" alt="Site Logo" />
        </Link>
        <h1 className="navbar-header">The World of Sourdough</h1>
      </div>
      <nav className="navbar-menu">
        <NavLink to="/" className={getClassName()}>
          Home
        </NavLink>
        <NavLink to="/recipes" className={getClassName()}>
          Recipes
        </NavLink>
        <NavLink to="/add-recipes" className={getClassName()}>
          Add Recipe
        </NavLink>
        <div className="login">
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </header>
  )
}
