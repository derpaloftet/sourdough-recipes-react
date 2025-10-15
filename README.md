# The World of Sourdough

## What is The World of Sourdough

Welcome to The World of Sourdough, your destination for exploring the art of sourdough baking!

It features:
- **Home Page**: Discover the benefits of sourdough and why it's a healthy and flavorful choice for your baking needs.
- **Recipes Page**: Browse a collection of sourdough recipes. Use filters like difficulty, preparation time, and sweetness to find the perfect recipe for your next bake.
- **Recipe Details Page**: Dive into detailed instructions with a list of ingredients and clear step-by-step directions.
- **Add Recipe Page**: Submit your favorite sourdough recipes using our easy-to-use form.

## How to start locally
Start the Vite development server:
```shell
npm run dev
```

In a separate terminal tab, start Tailwind CSS in watch mode:
```shell
npx tailwindcss -i ./src/App.css -o ./src/output.css --watch
```

## Technical Overview

The World of Sourdough is built using **React** and **TypeScript**.
Core Features:

**React Router**:
- Persistent Navbar and Footer with route-based content changes using `Outlet`.
- Dynamic route parameters (recipes/:id).
- Fallback routes for unmatched paths.
- `NavLink` for styled active states.

**Main Components**:
- Container Components: [Recipes](./src/pages/Recipes/Recipes.tsx) for handling state, logic, and data fetching, delegating UI to child components. [RecipeDetail](./src/pages/Recipes/RecipeDetail.tsx) for managing state and fetching data, also rendering UI directly.
- Presentational Components: [RecipesElement](src/pages/Recipes/RecipesCard.tsx) and [RecipesFilter](./src/pages/Recipes/RecipesFilter.tsx) for focused UI rendering.

**State Management and Hooks**:
- `useState`: Manages state for recipes, likes, pagination, and loading indicators.
- `useEffect`: Handles data fetching for recipes on rerender and localStorage updates for likedRecipes whenever likedRecipes state changes.
- `useSearchParams`: Manages URL query parameters for filtering recipes.
- `useParams`: Extracts route parameters (e.g., recipe id).
- `useLocation`: Retrieves route state for navigation and search persistence that are used for the "back" button.

**Additional Functionality**:
- Pagination for recipes.
- Client-side validation in the [AddRecipe](./src/pages/AddRecipe.tsx) form.
- LocalStorage for persisting liked recipes.
- Error handling (e.g., fallback for image load errors).
- Unique keys for lists using `nanoid()`.

**Firestore Integration**:
- Database setup and initialization in the project.
- .env for environment variables (Firebase keys).
- Functions for CRUD operations: `getRecipes()`, `getRecipeById()`, `addRecipe()`.
- Script to import recipes into Firestore.

**Visual Design**:

- Designed with a **mobile-first approach**, ensuring it works seamlessly on smaller screens and scales up for larger devices.
- Most Buttons and Navbar are styled with **Tailwind CSS** using utility classes and the @apply directive for efficiency.

**Developer Tools**:
- Git Hook with Husky: Pre-commit linting for consistent code quality.

**Testing with Vitest and React Testing Library**:
- Unit Tests for all pages check that they are rendered and work correctly.

**Deployment & CI/CD**:
- **Continuous Integration**: Set up with CircleCI for automated testing and builds on every commit.
- **Deployment**: Automatically deployed to Netlify on successful builds.


---

The World of Sourdough: Making sourdough baking healthy, delicious, and effortless for everyone!
