import React, { useState, useEffect } from 'react' //what do these do?

export default function RecipeDBTest() {
  const [recipes, setRecipes] = useState(false) //what is this structure? Is it a function?
  useEffect(() => {
    getRecipe()
  }, [])
  function getRecipe() {
    fetch('http://localhost:3001')
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        setRecipes(data)
      })
  }
  function createRecipe() {
    let name = prompt('Enter merchant name')
    let email = prompt('Enter merchant email')
    fetch('http://localhost:3001/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        return response.text()
      })
      .then((data) => {
        alert(data)
        getRecipe()
      })
  }

  return (
    <div>
      {recipes ? recipes : 'There is no recipe data available'}
      <br />
      <button onClick={createRecipe}>Add Recipe</button>
      <br />
    </div>
  )
}
