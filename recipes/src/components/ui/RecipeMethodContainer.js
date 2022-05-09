import './RecipeMethodContainer.css'

import MethodHeader from './MethodHeader'
import Method from './Method'

function RecipeMethodContainer() {
  return (
    <div className="recipe-method-container">
      <MethodHeader></MethodHeader>
      <Method></Method>
    </div>
  )
}

export default RecipeMethodContainer
