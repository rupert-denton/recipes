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
  console.log(
    `line 24: creating new entries in ingredient table for ${ingredientData}`
  )
  const ingredient_name = { ingredient_name: ingredientData }
  return db('ingredients')
    .insert(ingredient_name)
    .returning('id')
    .then((result) => {
      return result[0].id
    })
}

async function getIngredients(ingredientsArray, db = connection) {
  //deleted recipe id
  console.log(ingredientsArray)
  let ingredientIds = []
  for (let i = 0; i < ingredientsArray.length; i++) {
    const id = await findOrCreateIngredientId(ingredientsArray[i]) // rather than all at the same time - in parallel - i guess im confused because i thought a loop does things sequentially
    ingredientIds.push(id)
  }
  return ingredientIds
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
        : ingredient.id
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

  console.log(ingredientsArray)

  const [{ id: recipeId }] = await db('recipes')
    .insert(recipeDetails)
    .returning('id')

  console.log(`The recipe's id is: ${recipeId}`)

  const ingredientsWithIds = await getIngredients(ingredientsArray) //remobed recipe id param
  console.log(`The id of inserted ingredient(s) is/are: ${ingredientsWithIds}`)

  console.log(
    `The id of the newly created recipe is: ${recipeId}, the relevant ingredient ids are: ${ingredientsWithIds}`
  )
  //need to get existing ingredientId from the getIngredient function
  //Need to then wrap everything up and insert into db
}

module.exports = {
  getAllRecipes,
  getSpecificRecipe,
  addNewRecipe,
}
