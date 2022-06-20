import './RecipeIngredientsContainer.css'

import IngredientsHeader from './IngredientsHeader'
import IngredientsList from './IngredientsList'

function RecipeIngredientsContainer(props) {
  return (
    <div className="recipe-ingredients-container">
      <IngredientsHeader></IngredientsHeader>
      <IngredientsList
        recipeIngredients={props.recipeIngredients}
        onRemoveIngredient={props.onRemoveIngredient}
      ></IngredientsList>
    </div>
  )
}

export default RecipeIngredientsContainer
