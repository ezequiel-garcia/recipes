import classes from './RecipeView.module.css';

const RecipeView = ({ recipe }) => {
  const ingredients = recipe.ingredients.trim().split(/\n/g);
  console.log(ingredients);
  return (
    <div className={classes.container}>
      <h1 style={{ color: 'white' }}>{recipe.name}</h1>

      <img
        src={recipe.image}
        alt="recipe img"
        style={{ height: '20rem', width: '100%', objectFit: 'cover' }}
      />

      {/* Ingredients */}
      <div className={classes['ingredients-container']}>
        <h2 className={classes['category-title']}>Ingredients</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeView;
