const express = require('express')
const Dishes = require('./dishesModel')

const router = express.Router()

router.post('/', (req, res) => {
    const dish = req.body

    Dishes.add(dish)
        .then(dish => res.status(201).json(dish))
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Internal server error'})
        })
})

router.delete('/', (req, res) => {
    const dish = req.body

    if(dish.id && dish.restaurant_id) {
        Dishes.remove(dish)
        .then(res.status(200).json({message: 'Successfully deleted'}))
        .catch(err => {
            console.log(err)
            res.status(404).json({error: 'Dish not found'})
        })
    } else {
        res.status(400).json({error: 'Must include dish id and restaurant_id'})
    }
})

module.exports = router