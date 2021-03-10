const express = require('express')
const bcrypt = require('bcryptjs')
const Users = require('./usersModel')
const jwt = require('jsonwebtoken')

const router = express.Router()

// register new user
router.post('/register', async (req, res) => {
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

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if(email && password) {
        const user = await Users.getByEmail(email)

        if(await bcrypt.compare(password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({user: user.email, token})
        } else {
            res.status(401).json({error: 'Invalid email or password'})
        }

    } else {if(await bcrypt.compare())
        res.status(400).json({error: 'Must include email and password'})
    }
})

// test auth
router.get('/', (req, res) => {
    const { email, password, token } = req.body

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    res.send(decoded)
})

function generateToken(user) {
    const payload = {
      user: user.id,
    }
  
    const options = {
      expiresIn: '1d',
    }

    return jwt.sign(payload, process.env.TOKEN_SECRET, options)
}

module.exports = router