import { useState } from 'react';
import RecipesContainer from '../components/recipes/RecipesContainer';
import Search from '../components/recipes/Search';
import { recipes } from '../DUMMY_DATA';

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const allRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Search input={search} setInput={setSearch} />
      <RecipesContainer recipes={allRecipes} />
    </>
  );
};

export default RecipesPage;
