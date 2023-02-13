import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import RecipesContext from '../components/store/recipes-context';

const RecipeDetailPage = () => {
  const recipesCtx = useContext(RecipesContext);
  const { recipeId } = useParams();

  const recipe = recipesCtx.recipes.find((recipe) => recipe.id === recipeId);
  console.log(recipe);

  // make the line break in the \n
  function replaceWithBr() {
    return recipe.ingredients.replace(/\n/g, '<br />');
  }

  return (
    <div>
      <h1
        style={{ color: 'white' }}
        dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
      />
    </div>
  );
};

export default RecipeDetailPage;
