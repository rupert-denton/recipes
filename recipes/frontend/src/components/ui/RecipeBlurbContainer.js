import './RecipeBlurbContainer.css'
import Information from './Information'

function RecipeBlurbContainer(props) {
  console.log(props)
  return (
    <div className="recipe-blurb-container">
      <Information></Information>
    </div>
  )
}

export default RecipeBlurbContainer
