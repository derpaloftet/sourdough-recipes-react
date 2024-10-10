import recipesData from "../assets/recipes.json"
import { useLocation, useParams } from "react-router-dom"
import breadWhite from "../assets/bread-recipe4.jpg"
import { nanoid } from 'nanoid'

export default function RecipeDetail() {
  const params = useParams()
  const currentId = params.id

/*
  const location = useLocation()
  console.log(location)
*/

  const currentRecipe = recipesData.map(item => {
    if(item.id === currentId){
      return (
        <div
          key={item.id}
          className="recipe-detail">
            <img className="detail-image" src={breadWhite} alt="recipe image"/>
            <div className="detail-text">
              <h2>{item.title}</h2>
              <div className="">
                <span className="detail">Difficulty: </span>{item.difficulty}
              </div>
            <div>
              <span className="detail">Duration: </span>{item.duration} minutes
            </div>
            <div>
              <div className="detail">Ingredients:</div>
              {item.ingredients.map(ingredient => {
              return (
                <ul key={nanoid()}>
                  <li>{ingredient.name} - {ingredient.quantity}</li>
                </ul>
              )
            })}
            </div>
            <div>
              <div className="detail">Instructions: </div>{item.instructions}</div>
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