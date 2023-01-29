import { Link } from 'react-router-dom';
import classes from './RecipeCard.module.css';
import { FaHeart } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} className={classes.recipe}>
      <FaHeart
        style={{
          fontSize: '20px',
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: '#f4f4f4',
        }}
      />
      <img src={recipe.image} alt={recipe.title} />

      <h2 className={classes.name}>{recipe.name}</h2>
    </Link>
  );
};

export default RecipeCard;
