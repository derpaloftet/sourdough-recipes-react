import {useState} from "react";

export default function AddRecipe() {

  interface Ingredient {
    name: string;
    quantity: string;
  }
  interface FormData {
    id: string,
    title: string,
    ingredients: Ingredient[],
    image: string,
    instructions: string,
    difficulty: string,
    duration: number
  }

  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>(
    {name: "", quantity: ""}
  )
  const [formData, setFormData] = useState<FormData>({
    id: "1",
    title: "",
    ingredients: [],
    image: "f92b87bc-3eaf-43cb-a7d5-fbfe4c6508b9.jpg",
    instructions: "",
    difficulty: "",
    duration: 0
  })
  function handleOnChange(e){
    const {name, value} = e.target
    if(name === "name" || name === "quantity"){
      setCurrentIngredient(prevState => {
        return {
          ...prevState,
          [name]: value,
        }
      })
    } else {
      setFormData(prevState => {
        return {
          ...prevState,
          [name]: value,
        }
      })
    }
  }

  function addIngredients(e) {
    e.preventDefault()
    if(currentIngredient.name && currentIngredient.quantity) {
      setFormData(prevState => {
        return {
          ...prevState,
          ingredients: [...prevState.ingredients, currentIngredient]
        }
      })
      setCurrentIngredient({name: "", quantity: ""})
    }
  }
  return (
    <div className="add-recipe">
      <h1 className="recipes-header">Add your Recipe</h1>
      <form className="add-recipe-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Put a recipe name here"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <div className="difficulty-group">
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={formData.difficulty === "easy"}
              onChange={handleOnChange}
            />
            <label htmlFor="easy">Easy</label>
            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={formData.difficulty === "medium"}
              onChange={handleOnChange}
            />
            <label htmlFor="medium">Medium</label>
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={formData.difficulty === "hard"}
              onChange={handleOnChange}
            />
            <label htmlFor="easy">Hard</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="text"
            placeholder="Ex: 300"
            name="duration"
            value={formData.duration}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <div className="ingredients-label">Ingredients:</div>
          <div className="ingredients">
            <label htmlFor="name">Name of an ingredient:</label>
            <textarea
              placeholder="Ex: wheat flour"
              name="name"
              value={currentIngredient.name}
              onChange={handleOnChange}
            />
            <label htmlFor="quantity">How much do you need:</label>
            <textarea
              placeholder="Ex: 450 grams"
              name="quantity"
              value={currentIngredient.quantity}
              onChange={handleOnChange}
            />
            <button className="add-ingredients-btn" onClick={addIngredients}>Add</button>
            <div className="ingredients-added">Added Ingredients:</div>
            <ul>
              {formData.ingredients.map(item => {
                console.log(item)
              return <li>{item.name} - {item.quantity}</li>
            })}
            </ul>
          </div>
        </div>
          <div className="form-group">
            <label htmlFor="instructions">Instructions:</label>
            <textarea
              placeholder="Put your instructions step by step"
              name="instructions"
              value={formData.instructions}
              onChange={handleOnChange}
            />
          </div>
      </form>
      <button className="basic-btn add-recipe-btn">Add Recipe</button>
    </div>
  )
}