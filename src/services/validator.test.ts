import { validateRecipe } from "./validator.ts"
import { Difficulty, Recipe } from "../assets/types.ts"
import { expect } from "vitest"

describe("Validator", () => {
  it("should validate successfully", () => {
    const recipe = {
      id: "G9niELZ5u4HZc62ul5PX",
      title: "Sourdough Lemon Pancakes",
      ingredients: [
        { name: "milk", quantity: "500 ml" },
        { name: "egg", quantity: "2 large" },
        { name: "lemon", quantity: "1 small" },
      ],
      image: "pancakes-recipe.jpeg",
      instructions:
        "Mix all ingredients until smooth. Cook lemon pancakes on a hot pan until bubbles form. Flip and cook until golden.",
      difficulty: Difficulty.Easy,
      duration: 34,
    } as Recipe

    const result = validateRecipe(recipe)

    expect(result).toEqual(true)
  })

  it("should not validate successfully", () => {
    const recipe = {
      id: "G9niELZ5u4HZc62ul5PX",
      title: "Sourdough Lemon Pancakes",
      ingredients: [],
      image: "pancakes-recipe.jpeg",
      instructions:
        "Mix all ingredients until smooth. Cook lemon pancakes on a hot pan until bubbles form. Flip and cook until golden.",
      difficulty: Difficulty.Easy,
      duration: 34,
    } as Recipe

    const result = validateRecipe(recipe)

    expect(result).toEqual(false)
  })
})
