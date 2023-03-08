import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import RecipesContext from '../components/store/recipes-context';

import RecipeForm from '../components/recipes/RecipeForm';

const NewRecipePage = () => {
  // For edit
  const recipesCtx = useContext(RecipesContext);
  const { recipeId } = useParams();

  const recipe = recipesCtx.recipes.find((recipe) => recipe.id === recipeId);

  return <RecipeForm recipeForEdit={recipe} />;
};

export default NewRecipePage;
