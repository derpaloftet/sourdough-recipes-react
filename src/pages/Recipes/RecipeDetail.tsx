import { Link, useParams } from "react-router-dom"
import breadWhite from "../../assets/bread-recipe4.jpg"
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

  useEffect(() => {
    setLoading(true)
    getRecipeById(currentId)
      .then((recipe) => {
        if (recipe) {
          setCurrentRecipe(recipe)
        } else {
          setCurrentRecipe(null)
        }
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
    return <div>Loading</div>
  }
  if (!currentRecipe) {
    return <NotFound />
  }

  return (
    <div className="recipe-detail">
      <img className="detail-image" src={breadWhite} alt="recipe image" />
      <div className="detail-text">
        <h2>{currentRecipe.title}</h2>
        <Link to=".." relative="path" className="recipe-back">
          &larr; <span>Back to all recipes</span>
        </Link>
        <div className="">
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
/*
  useEffect(() => {
    console.log("RecipeDetail - useEffect")
    getRecipeById(currentId).then((recipe) => {
      setCurrentRecipe(recipe)
    })
  }, [currentId])

  if (currentRecipe == null) {
    console.log("loading")
    return <div>Loading</div>
  } else if (Object.keys(currentRecipe).length <= 0) {
    console.log("notfound")
    return <NotFound />
  }

 */
