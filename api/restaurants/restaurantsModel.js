const db = require('../../data/knexConfig')

module.exports = {
    getByNameAndUserID
}

function getByNameAndUserID(restaurant, userID) {
    return db('restaurants')
        .where({restaurant, user_id: userID})
}