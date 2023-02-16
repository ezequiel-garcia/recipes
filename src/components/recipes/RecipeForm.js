import React, { useState, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import classes from './RecipeForm.module.css';
import RecipesContext from '../store/recipes-context';
import { useNavigate } from 'react-router-dom';
import CategorySelector from './CategorySelector';

//REMOVE
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    category: 'Main Course',
  });

  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleSelectCategory = (selectedCategory) => {
    setRecipe({ ...recipe, category: selectedCategory });
  };

  const handleImagePicker = async (e) => {
    const selectedFile = e.target.files[0];
    console.log(JSON.stringify(selectedFile) + '--> selected');
    //setFile(selectedFile);
    setRecipe({ ...recipe, image: URL.createObjectURL(selectedFile) });

    // Create a root reference
    const storage = getStorage();

    // Create a reference to 'mountains.jpg'
    // const mountainsRef = ref(storage, 'mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    const storageRef = ref(storage, `recipesImages/${recipe.id}`);

    const response = await fetch(URL.createObjectURL(selectedFile));

    const blob = await response.blob();
    console.log(blob);

    uploadBytes(storageRef, blob)
      .then(async (snapshot) => {
        // console.log('Uploaded a blob or file!');
        try {
          const url = await getDownloadURL(storageRef);
          // updateEventImage(url, eventId);
          console.log(url);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        <div>
          <label htmlFor="name">Recipe Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImagePicker}
          />
          <img
            src={recipe.image}
            alt="recipe"
            style={{ height: '15rem', width: '15rem', objectFit: 'cover' }}
          />
        </div>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
