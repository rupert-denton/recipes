import './RecipeBlurbContainer.css'
import Blurb from './Information'

function RecipeBlurbContainer(ingr) {
  return (
    <div className="recipe-blurb-container">
      <Blurb>{ingr}</Blurb>
    </div>
  )
}

export default RecipeBlurbContainer
