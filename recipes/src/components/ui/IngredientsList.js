import './IngredientsList.css'

import IngredientNameQuant from './IngredientNameQuant'
function IngredientsList() {
  return (
    <div className="ingredients-list">
      <IngredientNameQuant></IngredientNameQuant>
      <IngredientNameQuant></IngredientNameQuant>
      <IngredientNameQuant></IngredientNameQuant>
    </div>
  )
}

export default IngredientsList
