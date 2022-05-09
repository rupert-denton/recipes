import './RecipeIngredientsContainer.css'

import IngredientsHeader from './IngredientsHeader'
import IngredientsList from './IngredientsList'

function RecipeIngredientsContainer() {
  return (
    <div className="recipe-ingredients-container">
      <IngredientsHeader></IngredientsHeader>
      <IngredientsList></IngredientsList>
    </div>
  )
}

export default RecipeIngredientsContainer
