const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require('./usersModel')

const router = express.Router()

// register new user
router.post('/register', async (req, res) => {
    console.log('sanity check')
    const { email, password } = req.body

    if(email && password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        Users.add({ email: email.toLowerCase(), password: hashedPassword })
            .then(user => res.status(201).json({...user, password: undefined}))
            .catch(err => {
                console.log(err)
                res.status(500).json({error: 'Internal server error'})
            })
    } else {
        res.status(400).json({error: 'Must include email and password'})
    }
})

module.exports = router