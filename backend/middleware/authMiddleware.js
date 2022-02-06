import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    let flag = 'on'
    // console.log(req.headers.authorization)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    // if (flag == 'on')
    {
        try {
            token = req.headers.authorization.split(' ')[1]

            // console.log(token)
            const decoded = jwt.verify(token, 'abc123')

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    else {
        console.log('no token')
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token ')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}


export { protect, admin }