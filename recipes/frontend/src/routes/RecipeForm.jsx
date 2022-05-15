import './RecipeForm.css'
import React, { useState } from 'react'
import MeasurementDropdown from '../components/ui/MeasurementDropdown'

export default function Recipe() {
  const [name, setName] = useState('')
  const [blurb, setBlurb] = useState('')
  const sendRecipeName = function (e) {
    e.preventDefault()
    console.log(name)
    console.log(blurb)
    fetch('http://localhost:3001/recipe', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name: name, blurb: blurb }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
  }

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>New Recipe!</h1>
          </div>
          <div className="recipe-title recipe-element">
            <label>Recipe Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="recipe-blurb recipe-element">
            <label>Recipe Blurb</label>
            <textarea
              type="text"
              rows="10"
              cols="33"
              onChange={(e) => setBlurb(e.target.value)}
            ></textarea>
          </div>
          <div className="ingredient-triad">
            <input className="ingredient" type="text"></input>
            <input className="quantity" type="text"></input>
            <MeasurementDropdown />
          </div>
          {/* <div className="new-ingredient-container">
            <button className="new-ing-button recipe-element" onClick={(e) => sendRecipeName(e)}>New Row</button>
          </div> */}
          <div className="save-button-container">
            <button className="save-recipe" onClick={(e) => sendRecipeName(e)}>
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

//             <div className="ingredient-triad">
//               <input className="ingredient" type="text"></input>
//               <input className="quantity" type="text"></input>
//               <MeasurementDropdown />
//             </div>
//             <div className="ingredient-triad">
//               <input className="ingredient" type="text"></input>
//               <input className="quantity" type="text"></input>
//               <MeasurementDropdown />
//             </div>
//             <div className="ingredient-triad">
//               <input className="ingredient" type="text"></input>
//               <input className="quantity" type="text"></input>
//               <MeasurementDropdown />
//             </div>
//           </div>
//           <div className="recipe-steps recipe-element">
//             <label>Steps</label>
//             <textarea type="text" rows="10" cols="33"></textarea>
//           </div>
