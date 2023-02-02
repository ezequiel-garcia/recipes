import { useState } from 'react';
import CategorySelector from '../components/recipes/CategorySelector';
import RecipesContainer from '../components/recipes/RecipesContainer';
import Search from '../components/recipes/Search';
import { recipes } from '../DUMMY_DATA';
import classes from './Recipes.module.css';
import { Link } from 'react-router-dom';
import MainNavigation from '../components/nav/MainNavigation';

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

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
        <button className={classes['new-button']}>
          <Link to="/new">Add new recipe</Link>
        </button>
      </div>

      <RecipesContainer recipes={allRecipes} />
    </>
  );
};

export default RecipesPage;
