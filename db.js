const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllRecipes(db = connection) {
  return db('recipes').select()
}

// function booksWrittenByAuthor(searchString) {
//   return db('books')
//     .join('authors_books', 'authors_books.book_id', 'books.id')
//     .join('authors', 'authors_books.author_id', 'authors.id')
//     .select('books.*', 'authors.name', 'authors.bio')
//   // .where('authors.name', 'LIKE', `%${searchString}%`)
// }

function getSpecificRecipe(id, db = connection) {
  return db('recipes')
    .join('ingredientrecipes', 'ingredientrecipes.recipe_id', 'recipes.id')
    .join('ingredients', 'ingredientrecipes.ingredient_id', 'ingredients.id')
    .select(
      'recipes.*',
      'ingredients.ingredient_name',
      'ingredientrecipes.measure',
      'ingredientrecipes.quantity'
    )
    .where('recipes.id', id)
}

module.exports = {
  getAllRecipes,
  getSpecificRecipe,
}
