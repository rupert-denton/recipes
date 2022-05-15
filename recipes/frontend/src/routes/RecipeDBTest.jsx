import './RecipeForm.css'
import React, { useState } from 'react'

export default function GetRecipe() {
  const [name, setName] = useState('')
  const retrieveRecipe = function (e) {
    e.preventDefault()
    console.log(name)
    fetch('http://localhost:3001/getjoinedrecipes/?param1=name', {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
      // body: JSON.stringify({ name: name }),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
  }

  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          <div className="page-header">
            <h1>Get Recipe!</h1>
          </div>
          <div className="recipe-title recipe-element">
            <label>Recipe Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} //event here is onChange this sets the value of e, presumably the target is the <input>
            ></input>
          </div>

          <div className="get-button-container">
            <button className="get-recipe" onClick={(e) => retrieveRecipe(e)}>
              Get Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
