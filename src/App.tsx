import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css'
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Recipes from "./pages/Recipes/Recipes.tsx"
import RecipeDetail from "./pages/Recipes/RecipeDetail.tsx"
import AddRecipe from "./pages/AddRecipe"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="recipes" element={<Recipes/>}/>
          <Route path="recipes/:id" element={<RecipeDetail/>}/>
          <Route path="add-recipes" element={<AddRecipe/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}