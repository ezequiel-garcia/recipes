import { Link } from 'react-router-dom';
import classes from './RecipeCard.module.css';
import { FaHeart } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  return (
    <div className={classes.recipe}>
      <FaHeart
        className={`${classes.favorite} ${
          recipe.isFavorite ? classes.isFavorite : ''
        }`}
        onClick={() => console.log('first')}
      />
      <Link to={`/recipes/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.title} />

        <p className={classes.name}>{recipe.name}</p>
      </Link>
    </div>
  );
};

export default RecipeCard;
