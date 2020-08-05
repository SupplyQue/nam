if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const app = express()
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const users = []

const initializePassport = require('./passport-config')
initializePassport(passport, email => users.find(user => user.email === email), id => users.find(user => user.id === id))

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


router.get('/index', checkAuthenticated, (req, res) => {
    res.render('index.ejs')
})
router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/index',
    failureReditect: '/login',
    failureFlash: true
}))


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/index')
    }
    next()
}


module.exports = router