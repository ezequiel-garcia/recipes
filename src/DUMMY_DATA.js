export const recipes = [
  {
    id: 1,
    name: 'Spagetti with salsa blanca and tomatoes chips',
    image:
      'https://images.unsplash.com/photo-1601751911508-fd69ffc08fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80',
    ingredients: [
      { cuantity: 1, ingridient: 'egg' },
      { cuantity: '100g', ingridient: 'flour' },
      { cuantity: '1tbs', ingridient: 'olive oil' },
    ],
    preparation: 'Put all the ingridients together. Amasa. Let the ',
    isFavorite: false,
    category: 'Main Course',
  },
  {
    id: 2,
    name: 'Curry',
    image:
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Vycnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ingredients: [
      { cuantity: 1, ingridient: 'egg' },
      { cuantity: '100g', ingridient: 'flour' },
      { cuantity: '1tbs', ingridient: 'olive oil' },
    ],
    preparation: 'Put all the ingridients together. Amasa. Let the ',
    isFavorite: true,
    category: 'Main Course',
  },
  {
    id: 3,
    name: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    ingredients: [
      { cuantity: 1, ingridient: 'egg' },
      { cuantity: '100g', ingridient: 'flour' },
      { cuantity: '1tbs', ingridient: 'olive oil' },
    ],
    preparation: 'Put all the ingridients together. Amasa. Let the ',
    isFavorite: true,
    category: 'Main Course',
  },
];

export const categories = [
  'Main Course',
  'Appetizer',
  'Dessert',
  'Salad',
  'Side dish',
  'Soup',
  'Other',
];
