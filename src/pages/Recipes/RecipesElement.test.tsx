import RecipesElement from "./RecipesElement.tsx"
import { Difficulty } from "../../assets/types.ts"
import { BrowserRouter } from "react-router-dom"

import { expect } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"

describe("RecipesElement", () => {
  it("should render properly", () => {
    render(
      <RecipesElement
        id="G9niELZ5u4HZc62ul5PX"
        title="Sourdough Lemon Pancakes"
        image="pancakes-recipe.jpeg"
        difficulty={Difficulty.Easy}
        duration={130}
        search="difficulty"
        likeClick={() => {}}
        likedRecipes={["G9niELZ5u4HZc62ul5PX", "G9niELZ8u4HZc62ul5PM"]}
      />,
      { wrapper: BrowserRouter },
    )
  })

  it("should call like event handler on button click", async () => {
    // Arrange
    const onClick = vi.fn()
    const id = "G9niELZ5u4HZc62ul5PX"
    render(
      <RecipesElement
        id={id}
        title="Sourdough Lemon Pancakes"
        image="pancakes-recipe.jpeg"
        difficulty={Difficulty.Easy}
        duration={130}
        search="difficulty"
        likeClick={onClick}
        likedRecipes={["G9niELZ5u4HZc62ul5PX", "G9niELZ8u4HZc62ul5PM"]}
      />,
      { wrapper: BrowserRouter },
    )
    const button = screen.getByTestId("button-favourite")

    // Act
    await userEvent.click(button)

    // Assert
    expect(onClick).toBeCalledTimes(1)
    expect(onClick).toBeCalledWith(id)
  })

  it("should add liked class when recipe's id is in liked recipes", () => {
    // Arrange
    const id = "G9niELZ5u4HZc62ul5PX"
    render(
      <RecipesElement
        id={id}
        title="Sourdough Lemon Pancakes"
        image="pancakes-recipe.jpeg"
        difficulty={Difficulty.Easy}
        duration={130}
        search="difficulty"
        likeClick={() => {}}
        likedRecipes={[id, "G9niELZ8u4HZc62ul5PM"]}
      />,
      { wrapper: BrowserRouter },
    )
    const button = screen.getByTestId("button-favourite")

    // Assert
    expect(button.classList.contains("btn-liked")).toEqual(true)
  })
})
