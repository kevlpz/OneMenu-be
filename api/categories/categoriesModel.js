const db = require('../../data/knexConfig')

module.exports = {
    getById,
    add,
    update,
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

function update(category) {
    const { id, categoryName, restaurant_id } = category

    return db('categories')
        .where({id: id, restaurant_id: restaurant_id})
        .update({category: categoryName}, 'id')
        .then(() => getById(id))
}

function remove(category) {
    const { id, restaurant_id } = category
    return db('categories')
        .where({id: id, restaurant_id: restaurant_id})
        .del()
}