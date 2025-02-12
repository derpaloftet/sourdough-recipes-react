import { collection, getDoc, getDocs, doc, addDoc } from "firebase/firestore"
import { db } from "./firestore.ts"
import { Recipe, RecipeRequest } from "../assets/types.ts"
import { validateRecipe } from "./validator.ts"

const collectionName = "Recipe"

export const getRecipes = async (): Promise<Recipe[]> => {
  const recipesCollection = collection(db, collectionName)
  const result = await getDocs(recipesCollection)
  return result.docs
    .map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        title: data.title,
        ingredients: data.ingredients,
        image: data.image,
        instructions: data.instructions,
        difficulty: data.difficulty,
        duration: data.duration,
      } as Recipe
    })
    .filter((recipe) => validateRecipe(recipe))
}

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const result = await getDoc(doc(db, collectionName, id))
  if (!result.exists()) {
    return null
  }
  const data = result.data()
  return {
    id: result.id,
    title: data.title,
    ingredients: data.ingredients,
    image: data.image,
    instructions: data.instructions,
    difficulty: data.difficulty,
    duration: data.duration,
  }
}

export const addRecipe = async (recipe: RecipeRequest): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), recipe)
  return docRef.id
}
