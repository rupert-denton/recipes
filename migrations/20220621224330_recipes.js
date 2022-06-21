/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('recipes', (table) => {
    table.increments('id').primary() //id
    table.string('recipe_name')
    table.text('recipe_method')
    table.text('recipe_description')
    table.text('recipe_slug')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('recipes')
}
