const db = require('../../data/knexConfig')

module.exports = {
    add
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