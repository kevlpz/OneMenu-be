const db = require('../../data/knexConfig')

module.exports = {
    add,
    remove
}

function getById(id) {
    return db('dishes')
        .where({id: id})
        .first()
}

function add(dish) {
    return db('dishes')
        .insert(dish, 'id')
        .then(([id]) => getById(id))
}

function remove(dish) {
    return db('dishes')
        .where({id: dish.id, restaurant_id: dish.restaurant_id})
        .del()
}