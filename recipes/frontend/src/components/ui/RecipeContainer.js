import './RecipeContainer.css'
import RecipeTitle from './RecipeTitle'
import RecipeMainContainer from './RecipeMainContainer'

function RecipeContainer(props) {
  return (
    <div className="recipe-container">
      <RecipeTitle recipeName={props.recipeName}></RecipeTitle>
      {/* <RecipeMainContainer></RecipeMainContainer> */}
    </div>
  )
}

export default RecipeContainer
