import recipesData from "../assets/recipes.json"
import {Recipe} from "../assets/types"
import breadWhite from "../assets/bread-recipe4.jpg"
import sadBread from "../assets/sad_bread.png"
import {NavLink, useSearchParams} from "react-router-dom"
import {useState} from "react"

export default function Recipes() {
  const recipes: Recipe[] = recipesData

  /* Search params */

  const [searchParams, setSearchParams] = useSearchParams()
  const difficultyFilter = searchParams.get("difficulty")
  const durationFilter = Number(searchParams.get("duration"))
  const typeFilter = searchParams.get("type")

  /* Filtering */

  function handleChangeFilter(key: "difficulty" | "duration" | "type" | "clear", value?: string | number) {
    setSearchParams(prevParams=> {
      const currentValue= prevParams.get(key)

       if (key === "clear") {
        prevParams.delete("difficulty")
        prevParams.delete("duration")
        prevParams.delete("type")
      } else if (currentValue === String(value)) {
        prevParams.delete(key);
      }
       else {
        prevParams.set(key, String(value))
      }
      return prevParams
    })
  }

  let filteredRecipes = recipes
  if(difficultyFilter){
    filteredRecipes = filteredRecipes.filter(item => item.difficulty === difficultyFilter)
  }
  if (durationFilter){
    if(durationFilter <= 240){
      filteredRecipes = filteredRecipes.filter(item => item.duration <= durationFilter)
    }
    if(durationFilter > 240){
      filteredRecipes = filteredRecipes.filter(item => item.duration > durationFilter)
    }
  }

  if (typeFilter){
    if(typeFilter === "sweet"){
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

  const recipeElement = <div className="recipes-layout">{currentRecipes.map(item => {
    return (
      <div
        key={item.id}
        className="recipe-card">
        <NavLink to={item.id}>
          <img className="recipe-image" src={breadWhite} alt="image of the recipe"/>
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
  )}
  </div>
  const noRecipeElement = <div className="no-recipes-layout">
    <img src={sadBread} alt="The picture of a sad bread" />
    <p>Sorry, no recipe matching your criteria was found</p>
  </div>

  return (
    <div className="recipes">
      <h2 className="recipes-header">Recipes</h2>
          <div className="recipes-filter">
            <div className="filter-difficulty">
              <button className={difficultyFilter === "easy" ? "clicked" : ""}
                      onClick={() => handleChangeFilter("difficulty", "easy")}>easy</button>
              <button className={difficultyFilter === "medium" ? "clicked" : ""}
                      onClick={() => handleChangeFilter("difficulty", "medium")}>medium</button>
              <button className={difficultyFilter === "hard" ? "clicked" : ""}
                      onClick={() => handleChangeFilter("difficulty", "hard")}>hard</button>
            </div>
            <div className="filter-duration">
              <button className={durationFilter <= 90 && durationFilter ? "clicked" : ""}
                      onClick={() => handleChangeFilter("duration", 90)}>1 hour and less</button>
              <button className={durationFilter === 240 ? "clicked" : ""}
                      onClick={() => handleChangeFilter("duration", 240)}>4 hours and less</button>
              <button className={durationFilter === 241 ? "clicked" : ""}
                      onClick={() => handleChangeFilter("duration", 241)}>more than 4 hours</button>
            </div>
            <div className="filter-type">
              <button className={typeFilter === "sweet" ? "clicked" : ""}
                      onClick={() => handleChangeFilter("type", "sweet")}>sweet</button>
              <button className={typeFilter === "savoury" ? "clicked" : ""}
                      onClick={() => handleChangeFilter("type", "savoury")}>savoury</button>
            </div>
          </div>
      <button className="filter-clear"
              onClick={() => handleChangeFilter("clear")}>Clear filters</button>

      {currentRecipes.length ? recipeElement: noRecipeElement}

      <div className="recipes-pages">
        <button onClick={handlePrevPage} disabled={currentPage === 1}><i className="arrow left"></i></button>
        {currentPage}
        <button onClick={handleNextPage} disabled={currentPage === totalPages || !currentRecipes.length}><i className="arrow right"></i></button>
      </div>
    </div>
  )
}