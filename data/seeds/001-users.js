const bcrypt = require('bcryptjs')

const password = bcrypt.hashSync('12345', 8)

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'charmander@email.com', password},
        {id: 2, email: 'squirtle@email.com', password},
        {id: 3, email: 'bulbasaur@email.com', password}
      ]);
    });
};
