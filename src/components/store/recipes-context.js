import { createContext, useState, useEffect, useContext } from 'react';

import { db } from '../../firebase';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';

import AuthContext from './auth-context';
import { uploadImageAndGetURL } from '../util/images';

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

export const RecipesContextProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRecipes = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, authCtx.uid));
      console.log(querySnapshot);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setRecipes((prev) => [...prev, doc.data()]);
        console.log(doc.id, ' => ', doc.data());
      });
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // If the user is loggedOut, refresh the page to go back to authentication page
    if (
      !authCtx.isLoggedIn &&
      window.location.pathname !== '/' &&
      window.location.pathname !== '/authentication'
    )
      window.location.reload();

    //If there is not recipes and the user is LogedIn get the recipes from the DB
    if (recipes.length === 0 && authCtx.isLoggedIn) getRecipes();
  }, [recipes, authCtx.isLoggedIn]);

  // const uploadToFirebase = async (recipe) => {
  //   // upload the image to db storage and then put the url into recipe
  //   const recipeImageUrl = await uploadImageAndGetURL(recipe.image, recipe.id);
  //   const recipeWithPicture = { ...recipe, image: recipeImageUrl };
  //   await setDoc(doc(db, authCtx.uid, recipeWithPicture.id), {
  //     ...recipeWithPicture,
  //   });
  // };

  const addRecipe = async (recipe) => {
    // add the recipe to recipes context
    setRecipes((prev) => [...prev, recipe]);

    // Add the recipe to firebase
    try {
      // upload the image to db storage and then put the url into recipe
      const recipeImageUrl = await uploadImageAndGetURL(
        recipe.image,
        recipe.id
      );
      const recipeWithPicture = { ...recipe, image: recipeImageUrl };
      await setDoc(doc(db, authCtx.uid, recipeWithPicture.id), {
        ...recipeWithPicture,
      });
    } catch (e) {
      // If there is an error, remove the last element added to recipes in the context recipes
      setError('Error adding the new Recipe');
      console.error('Error adding document: ', e);
      setRecipes((prev) => prev.slice(0, -1));
      // setRecipes((prev) =>
      //   prev.filter((recipeItem) => recipeItem.id !== recipe.id)
      // );
    }
  };

  const deleteRecipe = async (recipeId) => {
    //references to delete recipe's picture
    const storage = getStorage();
    const desertRef = ref(storage, `recipesImages/${recipeId}`);

    const prevRecipes = [...recipes];
    setRecipes(prevRecipes.filter((recipeItem) => recipeItem.id !== recipeId));

    try {
      await deleteDoc(doc(db, authCtx.uid, recipeId));
      // Delete the picture
      await deleteObject(desertRef);
    } catch (error) {
      console.log(error);
      setError('Error deleting recipe from db');
      setRecipes(prevRecipes);
    }
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

    // uploading data to firebase
    try {
      // upload the image to db storage and then put the url into recipe
      const recipeImageUrl = await uploadImageAndGetURL(
        recipe.image,
        recipe.id
      );
      // If there is not a new recipeImageUrl use the current one
      const recipeWithPicture = recipeImageUrl
        ? { ...recipe, image: recipeImageUrl }
        : { ...recipe };
      await setDoc(doc(db, authCtx.uid, recipeWithPicture.id), {
        ...recipeWithPicture,
      });
    } catch (e) {
      setRecipes(prevRecipes);
      setError('Error updating Recipe');
      console.error('Error updating Recipe: ', e);
    }
  };

  const toggleFavorite = async (recipe) => {
    setRecipes((prev) =>
      prev.map((currentRecipe) => {
        if (currentRecipe.id === recipe.id) {
          return { ...currentRecipe, isFavorite: !currentRecipe.isFavorite };
        }
        return currentRecipe;
      })
    );

    //Change in firebase
    try {
      const recipeRef = doc(db, authCtx.uid, recipe.id);
      // Change the favorite
      await updateDoc(recipeRef, {
        isFavorite: !recipe.isFavorite,
      });
    } catch (e) {
      console.log(e);
      setError('Error changing favorite');
      //revert the isFavorite in context
      setRecipes((prev) =>
        prev.map((currentRecipe) => {
          if (currentRecipe.id === recipe.id) {
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
