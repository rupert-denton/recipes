import './IngredientsList.css'

import IngredientNameQuant from './IngredientNameQuant'
function IngredientsList(props) {
  console.log(props)
  return (
    <div className="ingredients-list">
      <IngredientNameQuant
        recipeIngredients={props.recipeIngredients}
      ></IngredientNameQuant>
    </div>
  )
}

export default IngredientsList
