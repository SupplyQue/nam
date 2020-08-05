const express = require('express')
const router = express.Router()
router.get('/register', (req, res) => {
    res.render('register.ejs')
})
router.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const hashedPassword1 = await bcrypt.hash(req.body.confirmpassword, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            confirmpassword: hashedPassword1
        })

    } catch {
        res.redirect('/register')
    }
    console.log(users)
})
module.exports = router