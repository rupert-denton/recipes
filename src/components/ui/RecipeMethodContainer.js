import './RecipeMethodContainer.css'

import MethodHeader from './MethodHeader'
import Method from './Method'

function RecipeMethodContainer(props) {
  return (
    <div className="recipe-method-container">
      <MethodHeader></MethodHeader>
      <Method recipeMethod={props.recipeMethod}></Method>
    </div>
  )
}

export default RecipeMethodContainer
