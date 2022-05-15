import './RecipeForm.css'
import React, { useState } from 'react'
import { setMaxListeners } from 'events'

function IngredientList(row) {
  return <div></div>
}
export default function GetRecipe() {
  const [name, setName] = useState('')
  const [title, setIngr] = useState('')
  const [ingr, setIngr] = useState('')

  const retrieveRecipe = function (e) {
    e.preventDefault()
    console.log(name)
    fetch(`http://localhost:3001/getjoinedrecipes/?name=${name}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json)
        let result = json.map((row, idx) => {
          return <span key={idx}>{row.ingredient_name}</span>
        })

        setIngr(result)
      })
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

      <div>{ingr}</div>
    </div>
  )
}
