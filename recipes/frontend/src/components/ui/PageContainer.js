import './PageContainer.css'
import RecipeContainer from './RecipeContainer'

function PageContainer(props) {
  console.log(props)
  return (
    <div className="page-container">
      <RecipeContainer
        recipeName={props.recipeName}
        recipeIngredients={
          props.recipeIngredients.length ? props.recipeIngredients : ''
        }
      ></RecipeContainer>
    </div>
  )
}

export default PageContainer
