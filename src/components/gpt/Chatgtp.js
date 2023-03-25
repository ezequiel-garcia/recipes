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
    setRecipe(null);
    setIsLoading(true);
    try {
      const recipe = await gptRequest(input);
      setRecipe(recipe);
    } catch (e) {
      error.response = true;
    }
    setIsLoading(false);
    setInput('');
  };

  const recipeDetails = recipe !== null ? recipe.trim().split(/\n/g) : [];

  return (
    <div className={classes['container-gpt']}>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label htmlFor="input">
            Ingredients that you have in your frigde
          </label>
          {error.input && <p className="">You have to add ingredients</p>}
          <input
            type="text"
            id="input"
            name="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={error.input ? 'error' : ''}
          />
        </div>

        <button type="submit" className="create-button">
          Search
        </button>
      </form>

      <div className={classes.recipe}>
        {isLoading && <Loader />}
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
