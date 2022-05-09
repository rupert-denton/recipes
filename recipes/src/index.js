<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
||||||| b56038d
import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Recipe from './routes/Recipe'
import RecipeForm from './routes/RecipeForm'

const root = ReactDOM.createRoot(document.getElementById('root'))
>>>>>>> e28c84d4273692fcc75eaf17b4cf2b90d43ec026
root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
||||||| b56038d
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
=======
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="recipe" element={<Recipe />} />
      <Route path="/newrecipe" element={<RecipeForm />} />
    </Routes>
  </BrowserRouter>
)
>>>>>>> e28c84d4273692fcc75eaf17b4cf2b90d43ec026

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
