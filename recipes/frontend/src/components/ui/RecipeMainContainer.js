import './RecipeMainContainer.css'
import Information from './Information'

function RecipeMainContainer(props) {
  console.log(props)
  return (
    <div className="recipe-main-container">
      <Information recipeIngredients={props.recipeIngredients}></Information>
    </div>
  )
}

export default RecipeMainContainer
