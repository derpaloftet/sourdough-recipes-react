import { addRecipe } from "../src/services/RecipesStorage"
import recipesData from "../src/assets/recipes.json"
import { RecipeRequest } from "../src/assets/types"

for (const item of recipesData) {
  const ref = await addRecipe(item as RecipeRequest)
  console.log(ref)
}
