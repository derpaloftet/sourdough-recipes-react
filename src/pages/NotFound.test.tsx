import { render, screen } from "@testing-library/react"
import NotFound from "./NotFound.tsx"
import { BrowserRouter } from "react-router-dom"
import { expect } from "vitest"

describe("NotFound", () => {
  it("should render properly", () => {
    render(<NotFound />, { wrapper: BrowserRouter })

    const notFoundElement = screen.getByTestId("not-found-header")
    expect(notFoundElement.textContent).toContain("not found")
  })
})
