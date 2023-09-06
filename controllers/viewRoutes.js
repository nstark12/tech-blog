const router = require('express').Router()
const { User, Post, Comment } = require('../models')

// homepage
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User }],
            raw: true
        })
        res.render('home', { posts, logged_in: req.session.logged_in })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router