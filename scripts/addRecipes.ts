import { addRecipe } from "../src/services/RecipesStorage"
import recipesData from "../src/assets/recipes.json"

for (const item of recipesData) {
  const ref = await addRecipe(item)
  console.log(ref)
}
