import classes from './RecipesContainer.module.css';
import RecipeCard from './RecipeCard';

const RecipesContainer = ({ recipes }) => {
  return (
    <div className={classes.container}>
      {recipes.length === 0}{' '}
      {<p className={classes['no-recipes']}>No recipes</p>}
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesContainer;
