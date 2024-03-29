import React, { useState } from 'react';
import { gptRequest } from '../../gptFunc';
import Loader from '../util/Loader';
import classes from './Chatgpt.module.css';

function Chatgtp() {
  const [input, setInput] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ input: false, response: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === '') {
      setError((prev) => {
        return { ...prev, input: true };
      });
      return;
    }
    setError({ input: false, response: false });
    setRecipe(null);
    setIsLoading(true);
    try {
      const recipe = await gptRequest(input);
      setRecipe(recipe);
    } catch (e) {
      setError((prev) => {
        return { ...prev, response: true };
      });
    }
    setIsLoading(false);
    setInput('');
  };

  const recipeDetails = recipe !== null ? recipe.trim().split(/\n/g) : [];

  return (
    <div className={classes['container-gpt']}>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="input">Insert your ingredients to get a recipe</label>
          <span>This is powered by ChatGPT</span>
          <input
            type="text"
            id="input"
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={error.input ? 'error' : ''}
          />
          {error.input && (
            <p className={classes['error-text']}>You have to add ingredients</p>
          )}
          {error.response && (
            <p className={classes['error-text']}>
              Error connecting to ChatGPT. Try again later
            </p>
          )}
        </div>

        <button type="submit" className="create-button">
          Search
        </button>
      </form>

      <div className={classes.recipe}>
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Loader />
          </div>
        )}
        {recipeDetails.map((recipeDetail, index) =>
          recipeDetail !== '' ? (
            <p
              key={index}
              className={
                index === 0
                  ? classes.title
                  : recipeDetail === 'Ingredients:'
                  ? classes.subtitle
                  : recipeDetail === 'Instructions:'
                  ? classes.subtitle
                  : ''
              }
            >
              {recipeDetail}
            </p>
          ) : (
            <br key={index} />
          )
        )}
      </div>
    </div>
  );
}

export default Chatgtp;
