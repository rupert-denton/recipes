import './RecipeIngredientsMethod.css'

import RecipeIngredientsContainer from './RecipeIngredientsContainer'
import RecipeMethodContainer from './RecipeMethodContainer'

function RecipeIngredientsMethod(props) {
  console.log(props)

  return (
    <div className="recipe-ingredients-method">
      <RecipeIngredientsContainer
        recipeIngredients={props.recipeIngredients}
      ></RecipeIngredientsContainer>
      <RecipeMethodContainer></RecipeMethodContainer>
    </div>
  )
}

export default RecipeIngredientsMethod
