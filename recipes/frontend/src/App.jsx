import './App.css'
import { Link } from 'react-router-dom'
import RecipeList from './components/ui/RecipeList'

// import PageContainer from './components/RecipePage/PageContainer'
// import FormContainer from './components/RecipeForm/FormContainer'

export default function App() {
  return (
    <div className="App">
      <h1>Recipes</h1>
      <div>
        {/* <Link to="/testdb">Test Database</Link> */}
        <RecipeList />
        <Link to="/newrecipe">New Recipe</Link>
      </div>
    </div>
  )
}
