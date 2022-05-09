import './RecipeContainer.css'
import RecipeTitle from './RecipeTitle'
import RecipeMainContainer from './RecipeMainContainer'

function RecipeContainer() {
  return (
    <div className="recipe-container">
      <RecipeTitle></RecipeTitle>
      <RecipeMainContainer></RecipeMainContainer>
    </div>
  )
}

export default RecipeContainer
