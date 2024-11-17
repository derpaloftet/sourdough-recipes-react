import { collection, getDoc, getDocs, doc, addDoc } from "firebase/firestore"
import { db } from "./firestore.ts"
import { Recipe } from "../assets/types.ts"

const collectionName = "Recipe"

export const getRecipes = async () => {
  const recipesCollection = collection(db, collectionName)
  const result = await getDocs(recipesCollection)
  return result.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      title: data.title,
      ingredients: data.ingredients,
      image: data.image,
      instructions: data.instructions,
      difficulty: data.difficulty,
      duration: data.duration,
    }
  })
}

export const getRecipeById = async (id: string): Promise<Recipe | null> => {
  const result = await getDoc(doc(db, collectionName, id))
  if (result.exists()) {
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
  return null
}

export const addRecipe = async (recipe: object) => {
  const docRef = await addDoc(collection(db, collectionName), recipe)
  return docRef.id
}
