const db = require('../../data/knexConfig')

module.exports = {
    getByNameAndUserID,
    getById,
    getCategories,
    add,
    deleteRestaurant
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
        .where({ restaurant_id: restaurantID })
} 

function add(restaurant) {
    return db('restaurants')
        .insert(restaurant, 'id')
        .then(([id]) => getRestaurantById(id))
}

function getRestaurantById(id) {
    return db('restaurants')
        .where({id: id})
        .first()
}

function deleteRestaurant(restaurantID, userID) {
    return db('restaurants')
        .where({id: restaurantID, user_id: userID})
        .del()
}