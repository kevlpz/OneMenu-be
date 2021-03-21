const Restaurants = require('../restaurants/restaurantsModel')

module.exports = async function(req, res, next) {
    const { restaurant_id } = req.body
    const user_id = req.user.id
    
    try {
        const restaurant = await Restaurants.getById(restaurant_id)
        if(restaurant.user_id === user_id) {
            next()
        } else {
            res.status(401).json({error: 'Unauthorized'})
        }
    } catch(err) {
        console.log(err)
        res.status(404).json({error: 'Restaurant not found'})
    }
}