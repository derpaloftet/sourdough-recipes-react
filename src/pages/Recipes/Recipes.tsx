import recipesData from "../../assets/recipes.json"
import { Recipe } from "../../assets/types.ts"
import sadBread from "../../assets/sad_bread.png"
import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import RecipesElement from "./RecipesElement.tsx"
import RecipesFilter from "./RecipesFilter.tsx"

export default function Recipes() {
  const recipes = recipesData as Recipe[]

  /* Search params */

  const [searchParams, setSearchParams] = useSearchParams()
  const difficultyFilter = searchParams.get("difficulty")
  const durationFilter = Number(searchParams.get("duration"))
  const typeFilter = searchParams.get("type")

  /* Filtering */

  function handleChangeFilter(key: "difficulty" | "duration" | "type" | "clear", value?: string | number) {
    setSearchParams(prevParams => {
      const currentValue = prevParams.get(key)

      if (key === "clear") {
        prevParams.delete("difficulty")
        prevParams.delete("duration")
        prevParams.delete("type")
      } else if (currentValue === String(value)) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, String(value))
      }
      return prevParams
    })
  }

  let filteredRecipes = recipes
  if (difficultyFilter) {
    filteredRecipes = filteredRecipes.filter(item => item.difficulty === difficultyFilter)
  }
  if (durationFilter) {
    if (durationFilter <= 240) {
      filteredRecipes = filteredRecipes.filter(item => item.duration <= durationFilter)
    }
    if (durationFilter > 240) {
      filteredRecipes = filteredRecipes.filter(item => item.duration > durationFilter)
    }
  }

  if (typeFilter) {
    if (typeFilter === "sweet") {
      filteredRecipes = filteredRecipes.filter(item => {
        return item.ingredients.some(ingredient => ingredient.name === "sugar")
      })
    }
    if (typeFilter === "savoury") {
      filteredRecipes = filteredRecipes.filter(item => {
        return item.ingredients.every(ingredient => ingredient.name !== "sugar")
      })
    }
  }

  /* Pagination */

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage)

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const recipeElement = <div className="recipes-layout">{currentRecipes.map(item => {
      return (
        <RecipesElement
          key={item.id}
          title={item.title}
          difficulty={item.difficulty}
          duration={item.duration}
        />
      )
    }
  )}
  </div>

  const noRecipeElement = <div className="no-recipes-layout">
    <img src={sadBread} alt="The picture of a sad bread"/>
    <p>Sorry, no recipe matching your criteria was found</p>
  </div>

  return (
    <div className="recipes">
      <h2 className="recipes-header">Recipes</h2>
      <RecipesFilter
        handleChangeFilter={handleChangeFilter}
        difficultyFilter={difficultyFilter}
        durationFilter={durationFilter}
        typeFilter={typeFilter}
      />

      {currentRecipes.length ? recipeElement : noRecipeElement}

      <div className="recipes-pages">
        <button onClick={handlePrevPage} disabled={currentPage === 1}><i className="arrow left"></i></button>
        {currentPage}
        <button onClick={handleNextPage} disabled={currentPage === totalPages || !currentRecipes.length}><i
          className="arrow right"></i></button>
      </div>
    </div>
  )
}