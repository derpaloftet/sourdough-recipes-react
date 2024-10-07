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