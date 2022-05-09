import './App.css'
import { Link } from 'react-router-dom'

// import PageContainer from './components/RecipePage/PageContainer'
// import FormContainer from './components/RecipeForm/FormContainer'

export default function App() {
  return (
    <div className="App">
      <h1>Recipes!</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/recipes">Recipes</Link> |<Link to="/new">New Recipe</Link>
      </nav>
    </div>
  )
}
