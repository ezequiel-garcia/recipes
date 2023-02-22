import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import RecipesContext from '../components/store/recipes-context';
import RecipeView from '../components/recipes/RecipeView';

const RecipeDetailPage = () => {
  const recipesCtx = useContext(RecipesContext);
  const { recipeId } = useParams();

  const recipe = recipesCtx.recipes.find((recipe) => recipe.id === recipeId);
  console.log(recipe);

  // make the line break in the \n

  return (
    <div>
      <RecipeView recipe={recipe} />
    </div>
  );
};

export default RecipeDetailPage;
