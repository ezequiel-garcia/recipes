import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classes from './RecipeCard.module.css';
import { FaHeart } from 'react-icons/fa';
import RecipesContext from '../store/recipes-context';

const RecipeCard = ({ recipe }) => {
  const recipeCtx = useContext(RecipesContext);
  return (
    <div className={classes.recipe}>
      <FaHeart
        className={`${classes.favorite} ${
          recipe.isFavorite ? classes.isFavorite : ''
        }`}
        onClick={() => recipeCtx.toggleFavorite(recipe)}
      />
      <Link to={`/recipes/${recipe.id}`}>
        <div className={classes.img}>
          <img src={recipe.image} alt={recipe.title} />
        </div>

        <p className={classes.name}>{recipe.name}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
