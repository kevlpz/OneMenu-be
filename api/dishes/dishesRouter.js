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

module.exports = router