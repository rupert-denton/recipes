/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('ingredientrecipes', (table) => {
    table.increments('id').primary() //id
    table.string('measure')
    table.string('quantity')
    table.integer('recipe_id').references('recipes.id')
    table.integer('ingredient_id').references('ingredients.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('ingredientrecipes')
}
