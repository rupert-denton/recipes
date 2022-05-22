import './PageContainer.css'
import RecipeTitle from './RecipeTitle'
import RecipeMainContainer from './RecipeMainContainer'

function PageContainer(props) {
  return (
    <div className="page-container">
      <RecipeTitle recipeName={props.recipeName}></RecipeTitle>
      <RecipeMainContainer
        recipeIngredients={
          props.recipeIngredients.length ? props.recipeIngredients : ''
        }
      ></RecipeMainContainer>
    </div>
  )
}

export default PageContainer
