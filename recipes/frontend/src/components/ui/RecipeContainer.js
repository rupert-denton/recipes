import './RecipeContainer.css'
import RecipeTitle from './RecipeTitle'
import RecipeMainContainer from './RecipeMainContainer'

function RecipeContainer(props) {
  console.log(props.recipeIngredients)
  return (
    <div className="recipe-container">
      <RecipeTitle recipeName={props.recipeName}></RecipeTitle>
      <RecipeMainContainer
        recipeIngredients={props.recipeIngredients}
      ></RecipeMainContainer>
    </div>
  )
}

export default RecipeContainer
