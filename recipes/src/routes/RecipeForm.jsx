import './RecipeForm.css'
import MeasurementDropdown from '../components/ui/MeasurementDropdown'

export default function Recipe() {
  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>New Recipe!</h1>
          </div>
          <div className="recipe-title recipe-element">
            <label>Recipe Name</label>
            <input type="text"></input>
          </div>
          <div className="recipe-blurb recipe-element">
            <label>Recipe Blurb</label>
            <textarea type="text" rows="10" cols="33"></textarea>
          </div>
          <div className="recipe-ingredients recipe-element">
            <label>Ingredients</label>
            <div className="ingredient-triad">
              <input className="ingredient" type="text"></input>
              <input className="quantity" type="text"></input>
              <MeasurementDropdown />
            </div>
            <div className="ingredient-triad">
              <input className="ingredient" type="text"></input>
              <input className="quantity" type="text"></input>
              <MeasurementDropdown />
            </div>
            <div className="ingredient-triad">
              <input className="ingredient" type="text"></input>
              <input className="quantity" type="text"></input>
              <MeasurementDropdown />
            </div>
            <div className="ingredient-triad">
              <input className="ingredient" type="text"></input>
              <input className="quantity" type="text"></input>
              <MeasurementDropdown />
            </div>
            <div className="ingredient-triad">
              <input className="ingredient" type="text"></input>
              <input className="quantity" type="text"></input>
              <MeasurementDropdown />
            </div>
          </div>
          <div className="recipe-steps recipe-element">
            <label>Steps</label>
            <textarea type="text" rows="10" cols="33"></textarea>
          </div>
          <div className="save-button-container">
            <button className="save-recipe">Submit Recipe</button>
          </div>
        </form>
      </div>
    </div>
  )
}
