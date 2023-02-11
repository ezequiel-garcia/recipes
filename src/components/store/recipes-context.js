import { createContext, useState, useEffect, useContext } from 'react';

import { db } from '../../firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
} from 'firebase/firestore';

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

  const getRecipes = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, authCtx.uid));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setRecipes((prev) => [...prev, doc.data().recipe]);
      console.log(doc.id, ' => ', doc.data().recipe);
    });
    setIsLoading(false);
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

    // Add the recipe to firebase
    try {
      const docRef = await setDoc(doc(db, authCtx.uid, recipe.id), {
        recipe,
      });
      console.log('Document written with ID: ', docRef);
    } catch (e) {
      // If there is an error, remove the last element added to recipes in the context recipes
      setError('Error adding the new Recipe');
      console.error('Error adding document: ', e);
      setRecipes((prev) => prev.slice(0, -1));
      setRecipes((prev) =>
        prev.filter((recipeItem) => recipeItem.id !== recipe.id)
      );
    }
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

  const toggleFavorite = async (recipeId) => {
    let isFavorite;
    setRecipes((prev) =>
      prev.map((currentRecipe) => {
        if (currentRecipe.id === recipeId) {
          isFavorite = !currentRecipe.isFavorite;
          return { ...currentRecipe, isFavorite: !currentRecipe.isFavorite };
        }
        return currentRecipe;
      })
    );

    //Change in firebase
    try {
      const recipeRef = doc(db, authCtx.uid, recipeId);
      // Change the favorite
      await updateDoc(recipeRef, {
        isFavorite: isFavorite,
      });
    } catch (e) {
      setError('Error changing favorite');
      //revert the isFavorite in context
      setRecipes((prev) =>
        prev.map((currentRecipe) => {
          if (currentRecipe.id === recipeId) {
            isFavorite = !currentRecipe.isFavorite;
            return { ...currentRecipe, isFavorite: !currentRecipe.isFavorite };
          }
          return currentRecipe;
        })
      );
    }
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
