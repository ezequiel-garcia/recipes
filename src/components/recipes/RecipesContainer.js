import classes from './RecipesContainer.module.css';
import RecipeCard from './RecipeCard';

const RecipesContainer = ({ recipes }) => {
  return (
    <div className={classes.container}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesContainer;
