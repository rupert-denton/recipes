import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeForm from './routes/RecipeForm'
import RecipePage from './routes/RecipePage'
import AdminDashboard from './routes/AdminDashboard'
import EditRecipe from './routes/EditRecipe'
import EditRecipePage from './routes/EditRecipePage'
import CreateRecipeFormWrapper from './routes/CreateRecipeFormWrapper'
import EditRecipeFormWrapper from './routes/EditRecipeFormWrapper'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="recipe/:id" element={<RecipePage />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="admin/newrecipe" element={<CreateRecipeFormWrapper />} />
      <Route path="admin/editrecipes" element={<EditRecipe />} />
      <Route path="edit/:id" element={<EditRecipeFormWrapper />} />
    </Routes>
  </Router>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
