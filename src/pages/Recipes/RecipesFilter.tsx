import { useState } from "react";

export default function RecipesFilter({handleChangeFilter}: {
  handleChangeFilter: (key: "difficulty" | "duration" | "type" | "clear", value?: string | number) => void,
}) {
  const [filter, setFilter] = useState({
    difficulty: "",
    duration: "",
    type: ""
  })

  return (
    <>
      <div className="recipes-filter">

      </div>
      <button className="filter-clear"
              onClick={() => handleChangeFilter("clear")}>Clear filters
      </button>

      <select
        name="filter"
        value={filter.difficulty}
        onChange={(event) => {
          handleChangeFilter("difficulty", event.target.value)
          setFilter(prevState => {
            return {
              ...prevState,
              difficulty: event.target.value
            }
          })
        }}
      >
        <option value="">-- Select Difficulty --</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select
        name="filter"
        value={filter.duration}
        onChange={(event) => {
          handleChangeFilter("duration", event.target.value)
          setFilter(prevState => {
            return {
              ...prevState,
              duration: event.target.value
            }
          })
        }}
      >
        <option value="">-- Select Max Duration --</option>
        <option value="60">1 hour</option>
        <option value="240">4 hours</option>
        <option value="360">6 hours</option>
      </select>


      <select
        name="filter"
        value={filter.type}
        onChange={(event) => {
          handleChangeFilter("type", event.target.value)
          setFilter(prevState => {
            return {
              ...prevState,
              type: event.target.value
            }
          })
        }}
      >
        <option value="">-- Select Type --</option>
        <option value="sweet">Sweet</option>
        <option value="savoury">Savoury</option>
      </select>


    </>
  )
}

/*
      <div className="recipes-filter">
        <div className="filter-difficulty">
          <button className={difficultyFilter === "easy" ? "clicked" : ""}
                  onClick={() => handleChangeFilter("difficulty", "easy")}>easy
          </button>
          <button className={difficultyFilter === "medium" ? "clicked" : ""}
                  onClick={() => handleChangeFilter("difficulty", "medium")}>medium
          </button>
          <button className={difficultyFilter === "hard" ? "clicked" : ""}
                  onClick={() => handleChangeFilter("difficulty", "hard")}>hard
          </button>
        </div>
        <div className="filter-duration">
          <button className={durationFilter <= 90 && durationFilter ? "clicked" : ""}
                  onClick={() => handleChangeFilter("duration", 90)}>1 hour and less
          </button>
          <button className={durationFilter === 240 ? "clicked" : ""}
                  onClick={() => handleChangeFilter("duration", 240)}>4 hours and less
          </button>
          <button className={durationFilter === 241 ? "clicked" : ""}
                  onClick={() => handleChangeFilter("duration", 241)}>more than 4 hours
          </button>
        </div>
        <div className="filter-type">
          <button className={typeFilter === "sweet" ? "clicked" : ""}
                  onClick={() => handleChangeFilter("type", "sweet")}>sweet
          </button>
          <button className={typeFilter === "savoury" ? "clicked" : ""}
                  onClick={() => handleChangeFilter("type", "savoury")}>savoury
          </button>
        </div>
      </div>
      <button className="filter-clear"
              onClick={() => handleChangeFilter("clear")}>Clear filters
      </button>
 */