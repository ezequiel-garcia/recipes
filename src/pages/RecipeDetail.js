import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import RecipesContext from '../components/store/recipes-context';
import RecipeView from '../components/recipes/RecipeView';

const RecipeDetailPage = () => {
  const recipesCtx = useContext(RecipesContext);
  const { recipeId } = useParams();

  const recipe = recipesCtx.recipes.find((recipe) => recipe.id === recipeId);

  if (recipesCtx.recipes.length > 0 && !recipe) {
    throw new Error('NO RECIPE FOUND');
  }

  return (
    <div>
      <RecipeView recipe={recipe} />
    </div>
  );
};

export default RecipeDetailPage;
