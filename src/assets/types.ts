enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}
interface Ingredient {
  name: string,
  quantity: string
}
export interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  image: string;
  instructions: string;
  difficulty: Difficulty;
  duration: number;
}