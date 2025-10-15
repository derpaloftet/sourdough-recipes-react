import { Link, useLocation, useParams } from "react-router-dom"
import breadWhite from "../../assets/bread-recipe3.jpg"
import { nanoid } from "nanoid"
import NotFound from "../NotFound.tsx"
import { getRecipeById } from "../../services/RecipesStorage.ts"
import { useState, useEffect } from "react"
import { Recipe } from "../../assets/types.ts"

export default function RecipeDetail() {
  const params = useParams()
  const currentId = params.id as string

  const [currentRecipe, setCurrentRecipe] = useState({} as Recipe | null)
  const [loading, setLoading] = useState(true)

  const location = useLocation()
  const search = (location.state && location.state.search) || ""

  useEffect(() => {
    setLoading(true)
    getRecipeById(currentId)
      .then((recipe) => {
        setCurrentRecipe(recipe || null)
      })
      .catch((error) => {
        console.error("It was not possible to fetch this recipe by id:", error)
        setCurrentRecipe(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentId])

  if (loading) {
    return <div>Loading...</div>
  }
  if (!currentRecipe) {
    return <NotFound />
  }

  return (
    <div className="recipe-detail">
      <img
        className="detail-image"
        src={`/src/assets/recipes/${currentRecipe.image}`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src = breadWhite
        }}
        alt="recipe image"
      />
      <div className="detail-text">
        <h2>{currentRecipe.title}</h2>
        <Link to={`..${search}`} relative="path" className="recipe-back">
          &larr; <span>Back to all recipes</span>
        </Link>
        <div>
          <span className="detail">Difficulty: </span>
          {currentRecipe.difficulty}
        </div>
        <div>
          <span className="detail">Duration: </span>
          {currentRecipe.duration} minutes
        </div>
        <div>
          <div className="detail">Ingredients:</div>
          {currentRecipe.ingredients.map((ingredient) => (
            <ul key={nanoid()}>
              <li>
                {ingredient.name} - {ingredient.quantity}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <div className="detail">Instructions:</div>
          {currentRecipe.instructions}
        </div>
      </div>
    </div>
  )
}
