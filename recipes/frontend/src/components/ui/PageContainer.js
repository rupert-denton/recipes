import './PageContainer.css'
import RecipeContainer from './RecipeContainer'

function PageContainer(props) {
  return (
    <div className="page-container">
      <RecipeContainer recipeName={props.recipeName}></RecipeContainer>
    </div>
  )
}

export default PageContainer
