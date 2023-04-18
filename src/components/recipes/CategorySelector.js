import React, { useState } from 'react';
import classes from './CategorySelector.module.css';

const categories = [
  'Main Course',
  'Appetizer',
  'Dessert',
  'Salad',
  'Side dish',
  'Soup',
  'Other',
];

const CategorySelector = ({ onChange, isFilter, style }) => {
  const defaultValue = isFilter ? '' : categories[0];
  const [selectedCategory, setSelectedCategory] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select
      value={selectedCategory}
      onChange={handleChange}
      className={classes['category-selector']}
      style={style}
    >
      {isFilter && <option value={''}>Filter by...</option>}
      {isFilter && <option value={'Favorites'}>Favorites</option>}
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
