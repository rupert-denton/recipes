import './Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="website-header">Sapidum</h1>
      <div className="nav-links-container">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/admin">
          Admin
        </Link>
      </div>
    </div>
  )
}

export default Navbar
