import './Information.css'

import RecipeMeta from './RecipeMeta'
import RecipeIngredientsMethod from './RecipeIngredientsMethod'

function Information(props) {
  return (
    <div className="blurb">
      <RecipeMeta></RecipeMeta>
      <RecipeIngredientsMethod
        recipeIngredients={props.recipeIngredients}
      ></RecipeIngredientsMethod>
    </div>
  )
}

export default Information
