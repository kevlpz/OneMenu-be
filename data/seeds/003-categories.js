
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, category: 'breakfast', restaurant_id: 1},
        {id: 2, category: 'lunch', restaurant_id: 1},
        {id: 3, category: 'dinner', restaurant_id: 1},
        {id: 4, category: 'breakfast', restaurant_id: 2},
        {id: 5, category: 'lunch', restaurant_id: 2},
        {id: 6, category: 'lunch', restaurant_id: 3},
        {id: 7, category: 'dinner', restaurant_id: 3}
      ]);
    });
};
