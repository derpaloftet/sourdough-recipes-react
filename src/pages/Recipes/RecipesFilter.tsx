export default function RecipesFilter({handleChangeFilter, difficultyFilter, durationFilter, typeFilter}: {
  handleChangeFilter: (key: "difficulty" | "duration" | "type" | "clear", value?: string | number) => void,
  difficultyFilter: string | null,
  durationFilter: number,
  typeFilter: string | null
}) {
  return (
    <>
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
    </>
  )
}