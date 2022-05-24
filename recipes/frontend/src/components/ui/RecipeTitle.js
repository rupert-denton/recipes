import './RecipeTitle.css'
import RecipeName from './RecipeName'

function RecipeTitle(props) {
  console.log(props)
  return (
    <div className="recipe-title">
      <RecipeName recipeName={props.recipeName}></RecipeName>
    </div>
  )
}

export default RecipeTitle
