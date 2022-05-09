import './RecipeForm.css'

const RecipeForm = () => {
  return (
    <form className="recipe-form">
      <div className="new-recipe__controls">
        <div className="new-recipe__control">
          <label>Blurb</label>
          <input type="text" />
        </div>
        <div className="new-recipe__control">
          <label>ingredients</label>
          <input type="text" />
        </div>
        <div className="new-recipe__control">
          <label>Steps</label>
          <input type="text" />
        </div>
      </div>
    </form>
  )
}

export default RecipeForm
