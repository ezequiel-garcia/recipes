import React, { useState } from 'react';
import { categories } from '../../DUMMY_DATA';
import classes from './CategorySelector.module.css';

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
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategorySelector;
