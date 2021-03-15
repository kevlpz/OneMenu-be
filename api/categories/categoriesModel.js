const db = require('../../data/knexConfig')

module.exports = {
    getById,
    add,
    remove
}

function getById(id) {
    return db('categories')
        .where({id: id})
        .first()
}

function add(category) {
    return db('categories')
        .insert(category, 'id')
        .then(([id]) => getById(id))
}

function remove(id) {
    return db('categories')
        .where({id: id})
        .del()
}