import RecipeCard from '../components/recipes/RecipeCard';
import { recipes } from '../DUMMY_DATA';

const RecipesPage = () => {
  const recipe = recipes[0];

  return (
    <div>
      <RecipeCard recipe={recipe} />
      <RecipeCard recipe={recipe} />
      <RecipeCard recipe={recipe} />
      <RecipeCard recipe={recipe} />
      <RecipeCard recipe={recipe} />
    </div>
  );
};

export default RecipesPage;
