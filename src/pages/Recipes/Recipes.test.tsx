import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { expect } from "vitest"
import { Mock } from "@vitest/spy"

import Recipes from "./Recipes.tsx"
import { Difficulty, type Recipe } from "../../assets/types.ts"
import { getRecipes } from "../../services/RecipesStorage.ts"

vi.mock("../../services/RecipesStorage.ts", () => ({
  getRecipes: vi.fn(),
}))

describe("Recipes", () => {
  it("should render properly", async () => {
    const getRecipesMock = (getRecipes as Mock).mockResolvedValue([
      {
        id: "G9niELZ5u4HZc62ul5PX",
        title: "Sourdough Lemon Pancakes",
        image: "pancakes-recipe.jpeg",
        difficulty: Difficulty.Easy,
        duration: 130,
        ingredients: [{ name: "test ingredient", quantity: "150gr" }],
        instructions: "test instructions",
      } as Recipe,
    ])

    render(<Recipes />, { wrapper: BrowserRouter })

    const recipesPageElement = await screen.findByTestId("recipes-page-header")
    expect(recipesPageElement.textContent).toContain("Recipes")
    expect(getRecipesMock).toHaveBeenCalledTimes(1)
  })
})
