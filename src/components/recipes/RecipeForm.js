import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import classes from './RecipeForm.module.css';
import RecipesContext from '../store/recipes-context';
import { useNavigate } from 'react-router-dom';
import CategorySelector from './CategorySelector';
import { resizeImage } from '../util/images';

const RecipeForm = ({ onSubmit }) => {
  const navigation = useNavigate();
  const recipeCtx = useContext(RecipesContext);
  const [recipe, setRecipe] = useState({
    name: '',
    id: uuid(),
    ingredients: '',
    instructions: '',
    image:
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    recipeImage: null,
    isFavorite: false,
    category: 'Main Course',
  });
  const [errors, setErrors] = useState({
    name: false,
    // ingredients: false,
    incomplete: false,
  });

  const handleChange = (event) => {
    //reset any error
    setErrors((prev) => ({ ...prev, name: false, incomplete: false }));
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleSelectCategory = (selectedCategory) => {
    setRecipe({ ...recipe, category: selectedCategory });
  };

  const handleImagePicker = async (e) => {
    const selectedFile = e.target.files[0];
    const imageResized = resizeImage(selectedFile);
    console.log(imageResized);
    //setFile(selectedFile);
    setRecipe({ ...recipe, image: URL.createObjectURL(selectedFile) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (recipe.name === '') {
      setErrors((prev) => ({ ...prev, name: true }));

      return;
    }

    recipeCtx.addRecipe(recipe);
    navigation('/recipes');
  };

  return (
    <div className={classes.containerForm}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label htmlFor="name">Recipe Name:</label>
          {errors.name && (
            <p className={classes['error-text']}>
              You have to complete the name
            </p>
          )}
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className={errors.name ? classes.error : ''}
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
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            rows={5}
          />
        </div>
        <div>
          <label htmlFor="name">Recipe Image:</label>
          <label className={classes['select-image-label']}>
            Select Image
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpg, image/gif, image/jpeg"
              onChange={handleImagePicker}
              style={{ display: 'none' }}
            />
          </label>
          <img
            src={recipe.image}
            alt="recipe"
            // style={{ height: '15rem', width: '15rem', objectFit: 'cover' }}
            className={classes['recipe-image']}
          />
        </div>

        <button
          type="submit"
          className={`${classes['select-image-label']} ${classes['create-button']}`}
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
