import './RecipeIngredientsMethod.css'

import RecipeIngredientsContainer from './RecipeIngredientsContainer'
import RecipeMethodContainer from './RecipeMethodContainer'

function RecipeIngredientsMethod() {
  return (
    <div className="recipe-ingredients-method">
      <RecipeIngredientsContainer></RecipeIngredientsContainer>
      <RecipeMethodContainer></RecipeMethodContainer>
    </div>
  )
}

export default RecipeIngredientsMethod
