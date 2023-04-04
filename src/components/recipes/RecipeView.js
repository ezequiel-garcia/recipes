import { useState } from 'react';
import { useContext } from 'react';
import Loader from '../util/Loader';
import classes from './RecipeView.module.css';
import { AiTwotoneDelete } from 'react-icons/ai';
import RecipesContext from '../store/recipes-context';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';

const RecipeView = ({ recipe }) => {
  const recipeCtx = useContext(RecipesContext);
  const navigation = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = (id) => {
    setShowConfirmation(false);
    recipeCtx.deleteRecipe(recipe.id);
    navigation('/recipes');
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
    <div className={classes['recipe-container']}>
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
          onClick={() => navigation(`/recipes/edit/${recipe.id}`)}
        >
          Edit
        </button>
      </div>
      <div className={classes['image-ingredients']}>
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
              {ingredients.map((ingredient, index) =>
                ingredient !== '' ? (
                  <li key={index}>{ingredient}</li>
                ) : (
                  <br key={index} />
                )
              )}
            </ul>
          </div>
        )}
      </div>
      {/* Instructions */}
      {instructions !== '' && (
        <div>
          <h2 className={classes['category-title']}>Instructions</h2>
          <p dangerouslySetInnerHTML={instructions} />
        </div>
      )}
      <button
        className={classes['delete-button']}
        onClick={() => setShowConfirmation(true)}
      >
        <AiTwotoneDelete
          size={40}
          style={{ color: '#e50a0a', fontWeight: '1rem' }}
        />
      </button>
      {showConfirmation && (
        <ConfirmDialog
          handleDelete={handleDelete}
          setShowConfirmation={setShowConfirmation}
        />
      )}
    </div>
  );
};

export default RecipeView;
