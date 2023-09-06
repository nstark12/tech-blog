const router = require('express').Router()
const { User, Post, Comment } = require('../models')

// homepage
router.get('/', async (req, res) => {
    try {
        const postsPosted = await Post.findAll({
            include: [{ model: User }]
        })

        const posts = postsPosted.map((post) => post.get({ plain: true }))
        
        res.render('home', { posts, logged_in: req.session.logged_in })
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [ 
                { 
                    model: User,
                    model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            }
                        ] 
                }
            ]
        })
        
        let singlePost = post.get({ plain: true })

        res.render('post', {
            singlePost,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// login page
router.get('/login', async (req, res) => {
    try {
        res.render('login')
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router