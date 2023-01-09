const models = require('../models')
const { hashPassword, verifyPassword } = require('../services/passwordService')
const { validateName, validateEmail, validatePassword } = require("../services/validationService")
const { userTransformer } = require('../transformers/user')

const store = async (req, res, next) => {
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const { name = '', email = '', password = '' } = req.body
    // Validation
    if (!validateName(name)) {
        result.success = false
        result.messages.push('Please enter a valid name')
    }
    if (!validateEmail(email)) {
        result.success = false
        result.messages.push('Please enter a valid email')
    }
    if (!validatePassword(password)) {
        result.success = false
        result.messages.push('Please enter a valid password')
    }
    if (!result.success) {
        // validation failed
        res.send(result)
        return
    }
    // validation passed
    // Store in database
    const [user, created] = await models.User.findOrCreate({
        where: {
            email
        },
        defaults: {
            name,
            password: hashPassword(password)
        }
    })
    if (created) {
        result.messages.push('User created successfully')
    } else {
        result.success = false
        result.messages.push('You are already registered')
    }
    // Send response
    return res.send(result)
}

const login = async (req, res, next) => {
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const { email = '', password = ''} = req.body
    if (!validateEmail(email)) {
        result.success = false
        result.messages.push('Please enter a valid email')
    }
    if (!validatePassword(password)) {
        result.success = false
        result.messages.push('Please enter a valid password')
    }
    if (!result.success) {
        res.send(result)
        return
    }
    // Validation passed - get the user
    const user = await models.User.findOne({
        where: {
            email,
        }
    })
    if (user) {
        if (verifyPassword(password, user.password)) {
            result.data = userTransformer(user)
            result.messages.push('Logged in successfully')
            // send token - later
        } else {
            result.success = false
            result.messages.push('Invalid password!')
        }
    } else {
        result.success = false
        result.messages.push('You do not have an account but you are welcome to register')
    }
    return res.send(result)
}

module.exports = {
    store,
    login
}