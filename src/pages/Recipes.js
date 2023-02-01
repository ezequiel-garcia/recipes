import { useState } from 'react';
import CategorySelector from '../components/recipes/CategorySelector';
import RecipesContainer from '../components/recipes/RecipesContainer';
import Search from '../components/recipes/Search';
import { recipes } from '../DUMMY_DATA';
import classes from './Recipes.module.css';

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
      <div className={classes['filter-search-container']}>
        <Search input={search} setInput={setSearch} />
        <CategorySelector
          onChange={setFilterCategory}
          //   defaultValue={filterCategory}
          isFilter
        />
      </div>

      <RecipesContainer recipes={allRecipes} />
    </>
  );
};

export default RecipesPage;
