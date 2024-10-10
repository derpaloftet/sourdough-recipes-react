import recipesData from "../assets/recipes.json"
import {Recipe} from "../assets/types"
import breadWhite from "../assets/bread-recipe4.jpg"
import {NavLink, useSearchParams} from "react-router-dom"
import {useState} from "react"

export default function Recipes() {
  const recipes: Recipe[] = recipesData

  /* Search params */

  const [searchParams, setSearchParams] = useSearchParams()
  const difficultyFilter = searchParams.get("difficulty")
  const durationFilter = searchParams.get("duration")
  const typeFilter = searchParams.get("type")

  /* Filtering */

  let filteredRecipes
  if(difficultyFilter){
    filteredRecipes = recipes.filter(item => item.difficulty === difficultyFilter)
  }
  if(durationFilter){
    filteredRecipes = recipes.filter(item => item.duration <= Number(durationFilter))
  }
  if(typeFilter){
    let hasSugar = false
    if (typeFilter === "sugar") {
      hasSugar = true
    }
    if (hasSugar) {
      filteredRecipes = recipes.filter(item => {
        return item.ingredients.some(ingredient => ingredient.name === "sugar")
      })
    } else {
      filteredRecipes = recipes.filter(item => {
        return item.ingredients.every(ingredient => ingredient.name !== "sugar")
      })
    }
  }


  /*const filteredRecipes = difficultyFilter ?
    recipes.filter(recipe => recipe.difficulty === difficultyFilter) :
    recipes*/

  /* Pagination */

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage)

  function handlePrevPage(){
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function handleNextPage(){
    if(currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  function handelChangeFilter(key, value) {
    setSearchParams(prevParams=> {
      if(value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  const recipeElement = currentRecipes.map(item => {
    return (
      <div
        key={item.id}
        className="recipe-card">
        <NavLink to={item.id}>
          <img className="recipe-image" src={breadWhite}/>
        </NavLink>
        <div className="recipe-title">{item.title}</div>
        <div className="recipe-keywords">
          <div className="recipe-keyword">{item.difficulty}</div>
          <div className="recipe-keyword">{item.duration} minutes</div>
        </div>
        <button className="btn-like">❤</button>
        <NavLink to={item.id}
                 className="basic-btn"
        >
          Go to Recipe Details
        </NavLink>
      </div>
    )
    }
  )
  return (
    <>
      <h2 className="recipes-header">Recipes</h2>
      <div className="recipes-filter">
        <h3>Difficulty</h3>
        <button onClick={() => handelChangeFilter("difficulty", "easy")}>easy</button>
        <button onClick={() => handelChangeFilter("difficulty", "medium")}>medium</button>
        <button onClick={() => handelChangeFilter("difficulty", "hard")}>hard</button>

        <h3>Duration</h3>
        <button>1,5 hours and less</button>
        <button>2 hours and less</button>
        <button>more than 2 hours</button>

        <h3>Type</h3>
        <button>sweet</button>
        <button>savoury</button>

        <button onClick={() => handelChangeFilter("difficulty", null)}>Clear filters</button>
      </div>
      <div className="recipes-layout">
        {recipeElement}
      </div>
      <div className="recipes-pages">
        <button onClick={handlePrevPage} disabled={currentPage === 1}><i className="arrow left"></i></button>
      {currentPage}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}><i className="arrow right"></i></button>
      </div>
    </>
  )
}