const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })

        req.session.save(() => {
            req.session.user_id = newUser.id
            req.session.username = newUser.username
            req.session.logged_in = true
            
            res.status(200).json(newUser)
            
        })
    } catch(err) {
        console.log(err)
        res.status(401).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username }})

        if(!userData) {
            res.status(401).json({ message: 'Please enter a valid username and password' })
            return
        }

        const isCorrectPassword = await userData.checkPassword(req.body.password)

        if(!isCorrectPassword) {
            res.status(401).json({ message: 'Please enter a valid username and password' })
            return
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true

            res.status(202).json({ message: 'You are logged in!' })
        })

    } catch(err) {
        res.status(401).json(err)
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end
    }
})

module.exports = router