import { render, screen } from "@testing-library/react"
import { expect } from "vitest"
import AddRecipe from "./AddRecipe.tsx"

describe("AddRecipe", () => {
  it("should render properly", () => {
    render(<AddRecipe />)

    const homeHeaderElement = screen.getByTestId("add-recipe-header")
    expect(homeHeaderElement.textContent).toContain("Add your Recipe")
  })
})
