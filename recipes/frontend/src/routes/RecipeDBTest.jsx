import './RecipeForm.css'
import React, { useState } from 'react'
import PageContainer from '../components/ui/PageContainer.js'

export default function GetRecipe() {
  const [name, setName] = useState('')
  const [recipeInfo, setRecipeInfo] = useState([])
  const [ingredients, setIngredients] = useState([])

  const retrieveRecipe = function (e) {
    e.preventDefault()
    console.log(name)
    fetch(`http://localhost:3001/getjoinedrecipes/?name=${name}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((json) => {
        let result = json
        console.log(result)
        let ingredientList = []
        for (let i = 0; i < result.length; i++) {
          const ingObject = {
            name: result[i].ingredient_name,
            quantity: result[i].quantity,
            measure: result[i].measure,
          }
          ingredientList.push(ingObject)
        }
        setRecipeInfo(result)
        setIngredients(ingredientList)
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
      <div>
        <PageContainer
          recipeName={recipeInfo.length ? recipeInfo[0].recipe_name : ''}
          recipeBlurb={recipeInfo.length ? recipeInfo[0].recipe_blurb : ''}
          //insert method here
          recipeIngredients={ingredients.length ? ingredients : ''}
        ></PageContainer>
      </div>
    </div>
  )
}
