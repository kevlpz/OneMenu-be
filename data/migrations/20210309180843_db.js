
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments()
        tbl.string('email').notNullable().unique()
        tbl.string('password').notNullable()
    })
    .createTable('restaurants', tbl => {
      tbl.increments()
      tbl.string('restaurant').notNullable()
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    })
    .createTable('categories', tbl => {
      tbl.increments()
      tbl.string('category').notNullable()
      tbl.integer('restaurant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('restaurants')
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
    })
    .createTable('dishes', tbl => {
      tbl.increments()
      tbl.string('dish').notNullable()
      tbl.string('img')
      tbl.integer('restaurant_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('restaurants')
        .onDelete("CASCADE")
        .onUpdate("CASCADE")
      tbl.integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories')
      .onDelete("CASCADE")
      .onUpdate("CASCADE")
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('dishes')
    .dropTableIfExists('categories')
    .dropTableIfExists('restaurants')
    .dropTableIfExists('users')
};
