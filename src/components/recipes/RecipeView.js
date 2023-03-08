import { useContext } from 'react';
import Loader from '../util/Loader';
import classes from './RecipeView.module.css';
import { AiTwotoneDelete } from 'react-icons/ai';
import RecipesContext from '../store/recipes-context';
import { useNavigate } from 'react-router-dom';

const RecipeView = ({ recipe }) => {
  const recipeCtx = useContext(RecipesContext);
  const navigation = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete?') === true) {
      navigation('/recipes');
      recipeCtx.deleteRecipe(id);
    }
  };

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ color: 'white' }}>{recipe.name}</h1>
        <button
          className={classes['edit-button']}
          onClick={() => navigation(`/edit/${recipe.id}`)}
        >
          Edit
        </button>
      </div>

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
      <button
        className={classes['delete-button']}
        onClick={() => handleDelete(recipe.id)}
      >
        <AiTwotoneDelete
          size={40}
          style={{ color: '#f64040', fontWeight: '1rem' }}
        />
      </button>
    </div>
  );
};

export default RecipeView;
