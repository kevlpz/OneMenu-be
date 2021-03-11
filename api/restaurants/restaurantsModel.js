const db = require('../../data/knexConfig')

module.exports = {
    getByNameAndUserID,
    getById,
    getCategories
}

function getByNameAndUserID(restaurant, userID) {
    return db('restaurants')
        .where({ restaurant, user_id: userID })
        .fisrt()
}

function getById(id) {
    return db('restaurants')
        .join('dishes', 'restaurants.id', 'dishes.restaurant_id')
        .where({ restaurant_id: id })
}

function getCategories(restaurantID) {
    return db('categories')
        .where({restaurant_id: restaurantID})
}