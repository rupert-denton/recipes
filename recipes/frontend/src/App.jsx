import './App.css'
import { Link } from 'react-router-dom'

// import PageContainer from './components/RecipePage/PageContainer'
// import FormContainer from './components/RecipeForm/FormContainer'

export default function App() {
  return (
    <div className="App">
      <h1>Recipes</h1>
      <div>
        <Link to="/testdb">Test Database</Link>
        <Link to="/newrecipe">New Recipe</Link>
        <Link to="/recipe">Carbonara</Link>
      </div>
    </div>
  )
}