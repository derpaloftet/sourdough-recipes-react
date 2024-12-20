import React, { useState } from "react"
import { Ingredient, Difficulty, RecipeRequest } from "../assets/types"
import { addRecipe } from "../services/RecipesStorage.ts"

export default function AddRecipe() {
  const initialFormState: RecipeRequest = {
    title: "",
    ingredients: [],
    image: "f92b87bc-3eaf-43cb-a7d5-fbfe4c6508b9.jpg",
    instructions: "",
    difficulty: Difficulty.Easy,
    duration: 0,
  }
  const initialIngredient: Ingredient = {
    name: "",
    quantity: "",
  }
  const [currentIngredient, setCurrentIngredient] =
    useState<Ingredient>(initialIngredient)
  const [formData, setFormData] = useState<RecipeRequest>(initialFormState)
  const [enabledSubmitBtn, setEnabledSubmitBtn] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState<string[]>([])

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    if (name === "name" || name === "quantity") {
      setCurrentIngredient((prevState) => ({ ...prevState, [name]: value }))
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  function addIngredients(e: React.FormEvent) {
    e.preventDefault()
    if (currentIngredient.name && currentIngredient.quantity) {
      setFormData((prevState) => {
        return {
          ...prevState,
          ingredients: [...prevState.ingredients, currentIngredient],
        }
      })
      setCurrentIngredient(initialIngredient)
    }
  }

  function validateForm(): boolean {
    setFormError([])
    let hasErrors = false
    if (!formData.title.trim()) {
      setFormError((prevState) => [...prevState, "Please, add a title"])
      hasErrors = true
    }
    if (formData.duration <= 0) {
      setFormError((prevState) => [
        ...prevState,
        "Please, add duration in the form of a number!",
      ])
      hasErrors = true
    }
    if (formData.ingredients.length <= 0) {
      setFormError((prevState) => [
        ...prevState,
        "Please, add an ingredients list!",
      ])
      hasErrors = true
    }
    if (formData.image === "") {
      setFormError((prevState) => [...prevState, "Please, add an image!"])
      hasErrors = true
    }
    if (!formData.instructions.trim()) {
      setFormError((prevState) => [...prevState, "Please, add instructions!"])
      hasErrors = true
    }
    return hasErrors
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEnabledSubmitBtn(true)
    setTimeout(() => {
      setEnabledSubmitBtn(false)
    }, 3000)

    /* Form Validation */
    const formHasErrors = validateForm()

    /* Form Submitting */
    if (!formHasErrors) {
      await addRecipe(formData)
      setFormData(initialFormState)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
      }, 7000)
    }
  }

  return (
    <main className="add-recipe">
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
              id="easy"
              value={Difficulty.Easy}
              checked={formData.difficulty === Difficulty.Easy}
              onChange={handleOnChange}
            />
            <label htmlFor="easy">Easy</label>
            <input
              type="radio"
              name="difficulty"
              id="medium"
              value={Difficulty.Medium}
              checked={formData.difficulty === Difficulty.Medium}
              onChange={handleOnChange}
            />
            <label htmlFor="medium">Medium</label>
            <input
              type="radio"
              name="difficulty"
              id="hard"
              value={Difficulty.Hard}
              checked={formData.difficulty === Difficulty.Hard}
              onChange={handleOnChange}
            />
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            min="0"
            placeholder="Ex: 300"
            name="duration"
            id="duration"
            value={formData.duration || ""}
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
              id="name"
              value={currentIngredient.name}
              onChange={handleOnChange}
            />
            <label htmlFor="quantity">How much do you need:</label>
            <textarea
              placeholder="Ex: 450 grams"
              name="quantity"
              id="quantity"
              value={currentIngredient.quantity}
              onChange={handleOnChange}
            />
            <button className="add-ingredients-btn" onClick={addIngredients}>
              Add
            </button>
            {formData.ingredients.length > 0 && (
              <div className="ingredients-added">Added Ingredients:</div>
            )}
            <ul>
              {formData.ingredients.map((item, index) => {
                return (
                  <li key={index}>
                    {item.name} - {item.quantity}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            placeholder="Put your instructions step by step"
            name="instructions"
            id="instructions"
            value={formData.instructions}
            onChange={handleOnChange}
          />
        </div>
      </form>
      <button
        className={enabledSubmitBtn ? "add-recipe-btn" : "disabled"}
        disabled={!enabledSubmitBtn}
        onClick={handleSubmit}
      >
        Add Recipe
      </button>
      {formError.length > 0 &&
        formError.map((error, index) => {
          console.log(formError)
          return (
            <p key={index} className="form-error-message">
              {error}
            </p>
          )
        })}
      {submitted && (
        <div className="submit-message">
          Your Recipe has been successfully submitted! Thank you for sharing!
        </div>
      )}
    </main>
  )
}
