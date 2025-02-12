// or ESM/TypeScript import
import Ajv from "ajv"
import { Recipe } from "../assets/types.ts"

const ajv = new Ajv()
const ingredientSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    quantity: { type: "string", minLength: 1 },
  },
}
const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 1 },
    ingredients: { type: "array", items: ingredientSchema, minItems: 1 },
    title: { type: "string", minLength: 1 },
    image: { type: "string", minLength: 1 },
    instructions: { type: "string", minLength: 1 },
    difficulty: { enum: ["easy", "medium", "hard"] },
    duration: { type: "integer", minimum: 1 },
  },
  required: [
    "id",
    "ingredients",
    "image",
    "instructions",
    "difficulty",
    "duration",
  ],
  additionalProperties: false,
}

export function validateRecipe(recipe: Recipe): boolean {
  const validate = ajv.compile(schema)
  const valid = validate(recipe)

  if (!valid) {
    console.log(`Invalid recipe with id: ${recipe.id}`)
    console.log(validate.errors)
  }

  return valid
}
