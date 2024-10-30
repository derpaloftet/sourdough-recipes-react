import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found-page">
      <h2>Sorry, the page you were looking for was not found.</h2>
      <NavLink to="/"
               className="basic-btn">
        Go back to Home Page
      </NavLink>
    </section>
  )
}