import { createContext, useState, useEffect, useCallback } from 'react';

//ESTO SACARLO DSPPP
import { recipes } from '../../DUMMY_DATA';

const RecipesContext = createContext({
  recipes: [],
  error: null,
  isLoading: false,
  setRecipes: (recipes) => {},
  addRecipe: (recipe) => {},
  deleteRecipe: (recipeId) => {},
  editRecipe: (recipe) => {},
});

const getAllRecipes = () => {
  return new Promise((resolve, reject) => {
    let recipess;
    setTimeout(() => {
      recipess = recipes;
      resolve(recipess);
      return recipess;
    }, 2000);
    // return recipess;
  });
};

export const RecipesContextProvider = ({ children }) => {
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
    getRecipes();
  }, []);
  //   const tokenData = retrieveStoredToken();
  //   let initialToken;
  //   if (tokenData) {
  //     initialToken = tokenData.token;
  //   }

  //   const [token, setToken] = useState(initialToken);

  //   const userIsLoggedIn = !!token;

  const contextValue = {
    recipes,
    error,
    isLoading,
    // token: token,
    // isLoggedIn: userIsLoggedIn,
    // login: loginHandler,
    // logout: logoutHandler,
  };

  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContext;
