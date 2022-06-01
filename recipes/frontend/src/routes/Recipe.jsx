import RecipeTitle from '../components/ui/RecipeTitle'
import RecipeIngredientsContainer from '../components/ui/RecipeIngredientsContainer'
import RecipeMethodContainer from '../components/ui/RecipeMethodContainer'
import React from 'react'

export default function Recipe() {
  return (
    <div>
      <div className="recipe-form-container">
        <form className="recipe-form">
          Title
          <div className="ingredient-method-frame"></div>
        </form>
      </div>
    </div>
  )
}
