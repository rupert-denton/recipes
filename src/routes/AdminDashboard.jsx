//external dependencies
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
