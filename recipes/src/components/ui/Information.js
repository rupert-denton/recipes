import './Information.css'

import RecipeMeta from './RecipeMeta'
import Blurb from './Blurb'
import RecipeIngredientsMethod from './RecipeIngredientsMethod'

function Information() {
  return (
    <div className="blurb">
      <RecipeMeta></RecipeMeta>
      <Blurb></Blurb>
      <RecipeIngredientsMethod></RecipeIngredientsMethod>
    </div>
  )
}

export default Information
