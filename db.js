const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
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
  // for (let i = 0; i < array.length; i++)
  // array -> array
  // [{ name, measure, quantity }] -> [{ id, measure, quantity }]
  // [{ id }] -> [<div></div>]
  return await Promise.all(
    //use Promise.all when dealing with async maps
    ingredientsArray.map(async (ingredient) => {
      const { measure, quantity } = ingredient
      const { ingredient_id } = await findOrCreateIngredient(ingredient)
      return { ingredient_id, measure, quantity }
    })
  )
}

function findOrCreateIngredient(ingredient, db = connection) {
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

async function addRecipe(recipe, db = connection) {
  return await db('recipes')
    .insert(recipe)
    .returning('id')
    .then((result) => {
      return result[0].id
    })
}

async function addRecipeWithIngredients(newRecipe, db = connection) {
  const { name, method, ingredients } = newRecipe
  const recipeDetails = {
    recipe_name: name,
    recipe_method: method,
  }

  const recipeId = await addRecipe(recipeDetails)
  await insertJoinedRecipeWithIngredients(recipeId, ingredients)
}

async function insertJoinedRecipeWithIngredients(
  recipeId,
  ingredients,
  db = connection
) {
  const ingredientsWithIds = await getIngredients(ingredients)
  const recipeIngredientsManyToManyJoin = ingredientsWithIds.map((ing) => ({
    recipe_id: recipeId,
    ...ing,
  }))

  return db('ingredientrecipes').insert(recipeIngredientsManyToManyJoin)
}

async function updateRecipe(updatedRecipe, db = connection) {
  const { id: recipeId, ingredients, name, method } = updatedRecipe
  const recipeDetails = {
    recipe_name: name,
    recipe_method: method,
  }

  await updateRecipeStuffs(recipeId, recipeDetails)
  await db('ingredientrecipes').delete().where(`recipe_id`, recipeId)
  await insertJoinedRecipeWithIngredients(recipeId, ingredients)
}

async function updateRecipeStuffs(id, recipe, db = connection) {
  return await db('recipes').where({ id }).update(recipe)
}

///delete
function deleteRecipe(id, db = connection) {
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
  addRecipeWithIngredients,
  deleteRecipe,
  updateRecipe,
}
