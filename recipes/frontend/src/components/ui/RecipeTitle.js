import './RecipeTitle.css'

function RecipeTitle(props) {
  return (
    <div className="recipe-title">
      <h1 className="recipe-name">{props.recipeName}</h1>
    </div>
  )
}

export default RecipeTitle
