import { createContext, useState, useEffect, useContext } from 'react';

//ESTO SACARLO DSPPP
import { recipes as currentRecipes } from '../../DUMMY_DATA';
import AuthContext from './auth-context';

const RecipesContext = createContext({
  recipes: [],
  error: null,
  isLoading: false,
  setRecipes: (recipes) => {},
  addRecipe: (recipe) => {},
  deleteRecipe: (recipeId) => {},
  editRecipe: (recipe) => {},
  toggleFavorite: (recipeId) => {},
});

const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    let recipess;
    setTimeout(() => {
      recipess = currentRecipes;
      resolve(recipess);
      return recipess;
    }, 2000);
    // return recipess;
  });
};

export const RecipesContextProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRecipes = () => {
    setIsLoading(true);
    getAllRecipes().then((recipes) => {
      setRecipes(recipes);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (recipes.length === 0 && authCtx.isLoggedIn) getRecipes();
  }, [recipes, authCtx.isLoggedIn]);

  const fetchRecipes = () => {
    setIsLoading(true);
    //MAKE THE FETCH TO THE FIREBASE USING THE authCtx.uid
    setRecipes(recipes);
    setIsLoading(false);
  };

  const addRecipe = async (recipe) => {
    setRecipes((prev) => [...prev, recipe]);
    console.log('recipe added');
    console.log(recipes);

    //add to firebase the recipe
    // try {
    //   await fetch(`https://jsonplaceholder.typicode.com/users/${authCtx.uid}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(newUser),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8'
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // Revert changes in context state
    // setError(true)
    //MAYBE IT COULD BE
    // setRecipes(prev => prev.filter(recipeItem => recipeItem.id !== recipe.id ))
    // }
  };

  const deleteRecipe = async (recipeId) => {
    const prevRecipes = [...recipes];
    setRecipes(prevRecipes.filter((recipeItem) => recipeItem.id !== recipeId));

    //add to firebase the recipe
    // try {
    //   await fetch(`https://jsonplaceholder.typicode.com/users/${authCtx.uid}`, {
    //     method: 'PUT',
    //     body: JSON.stringify(newUser),
    //     headers: {
    //       'Content-type': 'application/json; charset=UTF-8'
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    // Revert changes in context state
    // setError(true)
    //MAYBE IT COULD BE
    // setRecipes(prevRecipes)
    // }
  };

  const editRecipe = async (recipe) => {
    const prevRecipes = [...recipes];
    const recipesEdited = recipes.map((recipeItem) => {
      //if it's the edited return it, if not return the current recipe
      if (recipeItem.id === recipe.id) {
        return recipe;
      }
      return recipeItem;
    });
    setRecipes(recipesEdited);

    //fetch API
    //IF ERROR
    //setRecipes(prevRecipes);
  };

  const toggleFavorite = (recipeId) => {
    setRecipes((prev) =>
      prev.map((currentRecipe) => {
        if (currentRecipe.id === recipeId) {
          return { ...currentRecipe, isFavorite: !currentRecipe.isFavorite };
        }
        return currentRecipe;
      })
    );
  };

  const contextValue = {
    recipes,
    error,
    isLoading,
    fetchRecipes,
    addRecipe,
    deleteRecipe,
    editRecipe,
    setRecipes,
    toggleFavorite,
  };

  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
