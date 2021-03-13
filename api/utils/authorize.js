const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({error: 'Unauthorized'})
            } else {
                req.user = {email: decodedToken.email, id: decodedToken.id}
                next()
            }
        })
    } else {
        res.status(401).json({error: 'Unauthorized'})
    }
}