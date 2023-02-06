import { useState, useContext } from 'react';
import CategorySelector from '../components/recipes/CategorySelector';
import RecipesContainer from '../components/recipes/RecipesContainer';
import Search from '../components/recipes/Search';
import { recipes } from '../DUMMY_DATA';
import classes from './Recipes.module.css';
import { Link } from 'react-router-dom';
import MainNavigation from '../components/nav/MainNavigation';
import RecipesContext from '../components/store/recipes-context';

const RecipesPage = () => {
  const recipesCtx = useContext(RecipesContext);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const recipes = recipesCtx.recipes;

  const allRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()) &&
      recipe.category.toLowerCase().includes(filterCategory.toLowerCase())
  );

  return (
    <>
      <MainNavigation />
      <div className={classes['filter-search-container']}>
        <Search input={search} setInput={setSearch} />
        <CategorySelector
          onChange={setFilterCategory}
          //   defaultValue={filterCategory}
          isFilter
        />
        <div className={classes['new-container']}>
          <Link to="/new" className={classes['new-button']}>
            Add new recipe
          </Link>
        </div>
      </div>
      {recipesCtx.isLoading && <p style={{ color: 'white' }}>Loading...</p>}
      <RecipesContainer recipes={allRecipes} />
    </>
  );
};

export default RecipesPage;
