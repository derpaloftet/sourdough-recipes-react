import type { FilterKey, Recipe } from "../../assets/types.ts"
import sadBread from "../../assets/sad_bread.png"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import RecipesElement from "./RecipesElement.tsx"
import RecipesFilter from "./RecipesFilter.tsx"
import { getRecipes } from "../../services/RecipesStorage.ts"

const currentLikedRecipes = () => {
  const localStorageValue = localStorage.getItem("likedRecipes")
  return localStorageValue ? JSON.parse(localStorageValue) : []
}

export default function Recipes() {
  const [recipes, setRecipes] = useState([] as Recipe[] | null)
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [likedRecipes, setLikedRecipes] = useState(currentLikedRecipes)
  useEffect(() => {
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes))
  }, [likedRecipes])

  useEffect(() => {
    setLoading(true)
    getRecipes()
      .then((recipes) => {
        if (recipes) {
          setRecipes(recipes)
        } else {
          setRecipes(null)
        }
      })
      .catch((error) => {
        console.error("It was not possible to fetch the recipes", error)
        setRecipes(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (!recipes) {
    return <div>No Recipes found</div>
  }

  /* Search params */

  const difficultyFilter = searchParams.get("difficulty")
  const durationFilter = Number(searchParams.get("duration"))
  const typeFilter = searchParams.get("type")

  /* Filtering */

  function handleChangeFilter(key: FilterKey, value?: string | number) {
    setSearchParams((searchParams) => {
      if (key === "clear") {
        // reset all selects
        searchParams.delete("difficulty")
        searchParams.delete("duration")
        searchParams.delete("type")
      } else if (value === "") {
        // set empty select
        searchParams.delete(key)
      } else {
        // set new select value
        searchParams.set(key, String(value))
      }
      return searchParams
    })
    setCurrentPage(1)
  }

  let filteredRecipes = recipes
  if (difficultyFilter) {
    filteredRecipes = filteredRecipes.filter(
      (item) => item.difficulty === difficultyFilter,
    )
  }
  if (durationFilter) {
    filteredRecipes = filteredRecipes.filter(
      (item) => item.duration <= durationFilter,
    )
  }
  if (typeFilter) {
    if (typeFilter === "sweet") {
      filteredRecipes = filteredRecipes.filter((item) => {
        return item.ingredients.some(
          (ingredient) => ingredient.name === "sugar",
        )
      })
    }
    if (typeFilter === "savoury") {
      filteredRecipes = filteredRecipes.filter((item) => {
        return item.ingredients.every(
          (ingredient) => ingredient.name !== "sugar",
        )
      })
    }
  }

  /* Favourites */

  function handleFavouritesClick() {
    const favouriteRecipes =
      recipes &&
      recipes.filter((item) => {
        return likedRecipes.includes(item.id)
      })
    setRecipes(favouriteRecipes)
  }
  function handleLikeClick(id: string) {
    setLikedRecipes((prevState: string[]) => {
      if (prevState.includes(id)) {
        return prevState.filter((item) => item !== id)
      } else {
        return [...prevState, id]
      }
    })
  }

  /* Pagination */

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const recipeElement = (
    <div className="recipes-layout">
      {currentRecipes.map((item) => {
        return (
          <RecipesElement
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            difficulty={item.difficulty}
            duration={item.duration}
            search={`?${searchParams.toString()}`}
            likeClick={() => handleLikeClick(item.id)}
            likedRecipes={likedRecipes}
          />
        )
      })}
    </div>
  )

  const noRecipesElement = (
    <div className="no-recipes-layout">
      <img src={sadBread} alt="The picture of a sad bread" />
      <p>Sorry, no recipe matching your criteria was found</p>
    </div>
  )

  return (
    <main className="recipes">
      <h2 className="recipes-header">Recipes</h2>
      <RecipesFilter
        handleChangeFilter={handleChangeFilter}
        searchParams={searchParams}
        handleFavouritesClick={handleFavouritesClick}
      />

      {currentRecipes.length ? recipeElement : noRecipesElement}

      <div className="recipes-pages">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <i className="arrow left"></i>
        </button>
        {currentPage}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || !currentRecipes.length}
        >
          <i className="arrow right"></i>
        </button>
      </div>
    </main>
  )
}
