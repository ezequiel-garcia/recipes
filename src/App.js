import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import Background from './components/Background';
import HomePage from './pages/Home';
import AuthenticationPage, { checkAuthLoader } from './pages/Authentication';
import RecipesPage from './pages/Recipes';
import RecipeDetailPage from './pages/RecipeDetail';

import './App.css';
import NewRecipePage from './pages/NewRecipe';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: 'authentication', element: <AuthenticationPage /> },
  { path: 'recipes', element: <RecipesPage />, loader: checkAuthLoader },
  {
    path: 'recipes/:recipeId',
    element: <RecipeDetailPage />,
    loader: checkAuthLoader,
  },
  { path: 'new', element: <NewRecipePage />, loader: checkAuthLoader },
  { path: '*', loader: () => redirect('/') }, // Maybe add a 404 page
]);

function App() {
  // const authCtx = useContext(AuthContext);

  return (
    <Background>
      <RouterProvider router={router} />
    </Background>
  );
}

export default App;
