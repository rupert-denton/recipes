//external dependencies
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/ui/Navbar'

//css
import './AdminDashboard.css'

export default function AdminDashboard() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="dashboard-container">
        <Link className="dashboard-link" to="/">
          Front Page
        </Link>

        <Link className="dashboard-link" to="/admin/newrecipe">
          Create New Recipe
        </Link>

        <Link className="dashboard-link" to="/admin/editrecipes">
          Edit Recipe
        </Link>
      </div>
    </React.Fragment>
  )
}
