import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import classes from './RecipeForm.module.css';
import RecipesContext from '../store/recipes-context';
import { useNavigate } from 'react-router-dom';
import CategorySelector from './CategorySelector';

//PROBANDOOOO
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
//PROBANDOOO

const RecipeForm = ({ onSubmit }) => {
  const navigation = useNavigate();
  const recipeCtx = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({
    name: '',
    id: uuid(),
    ingredients: [],
    instructions: '',
    image:
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    recipeImage: null,
    isFavorite: false,
    category: '',
  });

  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleSelectCategory = (selectedCategory) => {
    setRecipe({ ...recipe, category: selectedCategory });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //PROBANDOOO
    try {
      const docRef = await addDoc(collection(db, 'recipes'), {
        recipe,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    //PROBANDO

    recipeCtx.addRecipe(recipe);
    navigation('/recipes');
  };

  return (
    <div className={classes.containerForm}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category</label>
          <CategorySelector
            onChange={handleSelectCategory}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
