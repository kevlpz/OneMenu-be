
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dishes').del()
    .then(function () {
      // Inserts seed entries
      return knex('dishes').insert([
        {id: 1, dish: 'hashbrown', restaurant_id: 1, category_id: 1},
        {id: 2, dish: 'steak', restaurant_id: 1, category_id: 2},
        {id: 3, dish: 'fried chicken', restaurant_id: 1, category_id: 3},
        {id: 4, dish: 'eggs', restaurant_id: 1, category_id: 1},
        {id: 5, dish: 'soup', restaurant_id: 2, category_id: 4},
        {id: 6, dish: 'rice and beans', restaurant_id: 2, category_id: 4},
        {id: 7, dish: 'lasagna', restaurant_id: 2, category_id: 5},
        {id: 8, dish: 'pasta', restaurant_id: 3, category_id: 7},
        {id: 9, dish: 'sandwich', restaurant_id: 3, category_id: 6},
        {id: 10, dish: 'bacon', restaurant_id: 3, category_id: 6},
      ]);
    });
};
