import { useState, useContext } from 'react';
import CategorySelector from '../components/recipes/CategorySelector';
import RecipesContainer from '../components/recipes/RecipesContainer';
import Search from '../components/recipes/Search';
import classes from './Recipes.module.css';
import { Link } from 'react-router-dom';
import RecipesContext from '../components/store/recipes-context';
import Loader from '../components/util/Loader';

const RecipesPage = () => {
  const recipesCtx = useContext(RecipesContext);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const recipes = recipesCtx.recipes;

  let allRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filterCategory === 'Favorites') {
    allRecipes = allRecipes.filter((recipe) => recipe.isFavorite === true);
  } else {
    allRecipes = allRecipes.filter((recipe) =>
      recipe.category.toLowerCase().includes(filterCategory.toLowerCase())
    );
  }

  return (
    <>
      <div className={classes['filter-search-container']}>
        <Search input={search} setInput={setSearch} />
        <CategorySelector
          onChange={setFilterCategory}
          //   defaultValue={filterCategory}
          isFilter
        />
        <div className={classes['new-container']}>
          <Link to="new" className={classes['new-button']}>
            Add new recipe
          </Link>
        </div>
      </div>
      {recipesCtx.isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </div>
      )}
      <RecipesContainer recipes={allRecipes} loading={recipesCtx.isLoading} />
    </>
  );
};

export default RecipesPage;
