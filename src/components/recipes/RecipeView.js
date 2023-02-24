import Loader from '../util/Loader';
import classes from './RecipeView.module.css';

const RecipeView = ({ recipe }) => {
  if (!recipe) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </div>
    );
  }
  const ingredients =
    recipe?.ingredients !== null && recipe?.ingredients !== ''
      ? recipe.ingredients.trim().split(/\n/g)
      : [];

  const instructions =
    recipe?.instructions !== ''
      ? { __html: recipe.instructions.replace(/\n/g, '<br />') }
      : '';

  return (
    <div className={classes.container}>
      <h1 style={{ color: 'white' }}>{recipe.name}</h1>

      <img
        src={recipe.image}
        alt="recipe img"
        style={{ height: '20rem', width: '100%', objectFit: 'cover' }}
      />

      {/* Ingredients */}
      {ingredients.length > 0 && (
        <div className={classes['ingredients-container']}>
          <h2 className={classes['category-title']}>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructions */}
      {instructions !== '' && (
        <div>
          <h2 className={classes['category-title']}>Instructions</h2>
          <p dangerouslySetInnerHTML={instructions} />
        </div>
      )}
    </div>
  );
};

export default RecipeView;
