import { NavLink } from "react-router-dom"
import breadWhite from "../../assets/bread-recipe3.jpg"
import type { Difficulty } from "../../assets/types.ts"

export default function RecipesCard({
  id,
  title,
  image,
  difficulty,
  duration,
  search,
  likeClick,
  likedRecipes,
}: {
  id: string
  title: string
  image: string
  difficulty: Difficulty
  duration: number
  search: string
  likeClick: (id: string) => void
  likedRecipes: string[]
}) {
  return (
    <>
      <main key={id} className="recipe-card">
        <NavLink to={id} state={{ search: search }}>
          <img
            className="recipe-image"
            src={`/src/assets/recipes/${image}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents error looping
              currentTarget.src = breadWhite // use fallback image
            }}
            alt="image of the recipe"
          />
        </NavLink>
        <div className="recipe-title">{title}</div>
        <div className="recipe-keywords">
          <div className="recipe-keyword">{difficulty}</div>
          <div className="recipe-keyword">{duration} minutes</div>
        </div>
        <button
          data-testid="button-favourite"
          className={`btn-like ${likedRecipes.includes(id) ? "btn-liked" : ""}`}
          onClick={() => likeClick(id)}
        >
          ❤
        </button>
        <NavLink to={id} state={{ search: search }} className="recipe-btn">
          Go to Recipe Details
        </NavLink>
      </main>
    </>
  )
}
