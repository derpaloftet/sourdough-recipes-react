import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { expect } from "vitest"
import Home from "./Home.tsx"

describe("Home", () => {
  it("should render properly", () => {
    render(<Home />, { wrapper: BrowserRouter })

    const homeHeaderElement = screen.getByTestId("home-header")
    expect(homeHeaderElement.textContent).toContain("What is Sourdough?")
  })
})
