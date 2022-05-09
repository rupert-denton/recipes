import './Information.css'

import RecipeMeta from './RecipeMeta'
import Blurb from './Blurb'
import RecipeIngredientsMethod from './RecipeIngredientsMethod'

function Information() {
  return (
    <div className="blurb">
      <RecipeMeta />
      <Blurb />
      <RecipeIngredientsMethod />
    </div>
  )
}

export default Information
