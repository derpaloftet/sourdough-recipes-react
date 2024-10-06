import recipesData from "../assets/recipes.json"
import {Recipe} from "../assets/types"
import breadWhite from "../assets/bread-recipe4.jpg"
import {NavLink} from "react-router-dom";
import {useState} from "react";

export default function Recipes() {
  const recipes: Recipe[] = recipesData
  const itemsPerPage = 8
  const totalPages = Math.ceil(recipes.length / itemsPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRecipes = recipes.slice(startIndex, startIndex + itemsPerPage)

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

  const recipeElement = currentRecipes.map(item => {
    return (
      <div className="recipe-card">
        <img className="recipe-image" src={breadWhite}/>
        <div className="recipe-title">{item.title}</div>
        <div className="recipe-difficulty">Difficulty: {item.difficulty}</div>
        <div className="recipe-duration">Duration: {item.duration} minutes</div>
        <button className="btn-like">❤</button>
        <NavLink to="/login"
                 className="home-link"
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
      <div className="recipes-cards">
        {recipeElement}
      </div>
      <div className="recipes-pages">
      <button onClick={handlePrevPage}><i className="arrow left"></i></button>
      {currentPage}
      <button onClick={handleNextPage}><i className="arrow right"></i></button>
      </div>
    </>
  )
}