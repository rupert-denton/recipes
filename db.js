const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllRecipes(db = connection) {
  return db('recipes').select()
}

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

//   //look into promise.all

function addNewIngr(ingredientData, db = connection) {
  const ingredient_name = { ingredient_name: ingredientData }
  return db('ingredients')
    .insert(ingredient_name)
    .returning('id')
    .then((result) => {
      return { ingredient_id: result[0].id, ingredient_name: ingredientData }
    })
}

async function getIngredients(ingredientsArray, db = connection) {
  let ingredientObjects = []
  for (let i = 0; i < ingredientsArray.length; i++) {
    const id = await findOrCreateIngredientId(ingredientsArray[i]) // rather than all at the same time - in parallel - i guess im confused because i thought a loop does things sequentially
    ingredientObjects.push(id)
  }
  return ingredientObjects
}

// this will create if doesn't exist (returning id), or return the id
// this doesn't need to know about the many to many table
function findOrCreateIngredientId(ingredient, db = connection) {
  return db('ingredients')
    .select()
    .first()
    .where('ingredient_name', ingredient.ingredient_name)
    .then((result) => {
      return result === undefined
        ? addNewIngr(ingredient.ingredient_name)
        : {
            ingredient_id: result.id,
            ingredient_name: ingredient.ingredient_name,
          }
    })
}

//starting point is here
async function addNewRecipe(newRecipe, db = connection) {
  console.log(newRecipe)
  const recipeDetails = {
    recipe_name: newRecipe.name,
    recipe_method: newRecipe.method,
  }
  const ingredientsArray = newRecipe.ingredients

  const [{ id: recipeId }] = await db('recipes')
    .insert(recipeDetails)
    .returning('id')
  const ingredientsNameAndIds = await getIngredients(ingredientsArray) //returns an array of ids

  ingredientsNameAndIds.forEach((ingredient) => {
    const recipeIngredient = ingredientsArray.find(
      (ri) => ri.ingredient_name === ingredient.ingredient_name
    )
    const ingredientRecipeObj = {
      recipe_id: recipeId,
      ingredient_id: ingredient.ingredient_id,
      measure: recipeIngredient.measure,
      quantity: recipeIngredient.quantity,
    }
    console.log(ingredientRecipeObj)

    return db('ingredientrecipes')
      .insert(ingredientRecipeObj)
      .returning('id')
      .then((result) => {
        return result[0].id
      })
  })
}

function deleteRecipe(id, db = connection) {
  console.log(id)

  return db('ingredientrecipes')
    .delete()
    .where(`recipe_id`, id)
    .then(() => {
      return db('recipes').delete().where({ id })
    })
}

module.exports = {
  getAllRecipes,
  getSpecificRecipe,
  addNewRecipe,
  deleteRecipe,
}
