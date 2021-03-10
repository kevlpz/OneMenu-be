
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {id: 1, restaurant: 'eric\'s chinese food', user_id: 1},
        {id: 2, restaurant: 'chris\' soul food', user_id: 2},
        {id: 3, restaurant: 'meryl\'s texmex', user_id: 3}
      ]);
    });
};
