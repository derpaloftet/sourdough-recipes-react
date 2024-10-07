import recipesData from "../assets/recipes.json"
import { useLocation, useParams } from "react-router-dom"
import breadWhite from "../assets/bread-recipe4.jpg";

export default function RecipeDetail() {
  const params = useParams()
  const currentId = params.id

  const currentRecipe = recipesData.map(item => {
    if(item.id === currentId){
      return (
        <div className="recipe-detail">
          <img className="detail-image" src={breadWhite}/>
          <div className="detail-text">
              <div className="recipe-title">{item.title}</div>
              <div>Difficulty: {item.difficulty}</div>
              <div>Duration: {item.duration} minutes</div>
              <div>
                Ingredients: {item.ingredients.map(ingredient => {
                return (
                  <ul>
                    <li>{ingredient.name} - {ingredient.quantity}</li>
                  </ul>
                )
              })}
              </div>
              <div>Instructions: {item.instructions}</div>
            </div>
        </div>
      )
    }
  })

  return (
    <>
      {currentRecipe}
    </>
  )
}