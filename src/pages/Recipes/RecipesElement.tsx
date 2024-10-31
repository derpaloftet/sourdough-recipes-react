import { NavLink } from "react-router-dom"
import breadWhite from "../../assets/bread-recipe4.jpg"
import type { Difficulty } from "../../assets/types.ts"

export default function RecipesElement({id, title, difficulty, duration}: {
  id: string,
  title: string,
  difficulty: Difficulty,
  duration: number
}) {
  return (
    <>
      <div
        key={id}
        className="recipe-card">
        <NavLink to={id}>
          <img className="recipe-image" src={breadWhite} alt="image of the recipe"/>
        </NavLink>
        <div className="recipe-title">{title}</div>
        <div className="recipe-keywords">
          <div className="recipe-keyword">{difficulty}</div>
          <div className="recipe-keyword">{duration} minutes</div>
        </div>
        <button className="btn-like">❤</button>
        <NavLink to={id}
                 className="basic-btn"
        >
          Go to Recipe Details
        </NavLink>
      </div>
    </>
  )
}