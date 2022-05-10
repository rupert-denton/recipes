const Pool = require('pg').Pool
const pool = new Pool({
  user: 'rupert',
  host: 'localhost',
  database: 'recipes',
  password: '41621#rde',
  port: 5432,
})

const getRecipe = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM recipes ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}
const createRecipe = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      recipe_name,
      recipe_description,
      recipe_complexity,
      recipe_method,
    } = body
    pool.query(
      'INSERT INTO recipes (recipe_name, recipe_description, recipe_complexity, recipe_method) VALUES (toast, hotbread, simple, get bread and put in toaster) RETURNING *',
      [recipe_name, recipe_description, recipe_complexity, recipe_method],
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new recipe has been added added: ${results.rows[0]}`)
      }
    )
  })
}

module.exports = {
  getRecipe,
  createRecipe,
}
