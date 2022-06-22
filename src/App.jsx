import './App.css'
import RecipeList from './components/ui/RecipeList'
import Navbar from './components/ui/Navbar'

// import PageContainer from './components/RecipePage/PageContainer'
// import FormContainer from './components/RecipeForm/FormContainer'

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <RecipeList />
      </div>
    </div>
  )
}
