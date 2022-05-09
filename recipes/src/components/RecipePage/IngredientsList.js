import './IngredientsList.css'

import IngredientItem from './IngredientItem'
function IngredientsList() {
  const ingredients = [
    {
      name: 'Sugar',
      quantity: '1tsp',
    },
    {
      name: 'Olive Oil',
      quantity: '1tbsp',
    },
    {
      name: 'Chicken',
      quantity: '500gms',
    },
  ]
  return (
    <div className="ingredients-list">
      <IngredientItem
        ingredientName={ingredients[0].name}
        quantity={ingredients[0].quantity}
      />
      <IngredientItem
        ingredientName={ingredients[1].name}
        quantity={ingredients[1].quantity}
      />
      <IngredientItem
        ingredientName={ingredients[2].name}
        quantity={ingredients[2].quantity}
      />
    </div>
  )
}

export default IngredientsList
