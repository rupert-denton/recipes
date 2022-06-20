//external dependencies
import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <React.Fragment>
      <Link to="/">Front Page</Link>
      <Link to="/admin/newrecipe">Create New Recipe</Link>
      <Link to="/admin/editrecipes">Edit Recipe</Link>
    </React.Fragment>
  )
}
