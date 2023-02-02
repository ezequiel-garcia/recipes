import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Background from './components/Background';
import HomePage from './pages/Home';
import AuthenticationPage from './pages/Authentication';
import RecipesPage from './pages/Recipes';
import RecipeDetailPage from './pages/RecipeDetail';

import './App.css';
import NewRecipePage from './pages/NewRecipe';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: 'authentication', element: <AuthenticationPage /> },
  { path: 'recipes', element: <RecipesPage /> },
  { path: 'recipes/:recipeId', element: <RecipeDetailPage /> },
  { path: 'new', element: <NewRecipePage /> },
]);

function App() {
  return (
    <Background>
      <RouterProvider router={router} />
    </Background>
  );
}

export default App;
