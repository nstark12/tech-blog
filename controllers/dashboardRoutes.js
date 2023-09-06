const router = require('express').Router()
const { User, Post, Comment } = require('../models')

router.get('/', async (req, res) => {
    try {
        
        const user = await Post.findAll({
            where : {
                user_id : req.session.user_id
            }, include : [{
                model: Comment, 
                include : {
                    model : User,
                    attributes : ['username']
                }
            }]
        }, 
        );


        const posts = user.map((post) => post.get({ plain: true }));
            
            res.render('dashboard', {
                posts, 
                logged_in: req.session.logged_in, 
            });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        
        const post = await Post.findByPk(req.params.id,
           {  include : [{
                model: Comment, 
                include : {
                    model : User,
                    attributes : ['username']
                }
            }, 
        {
            model: User, 
            attributes: ['username']
        }]
        }, 
        );


        // const editPost = post.get({ plain: true });
        //     // res.status(200).json({editPost})
        //     res.render('editDeletePost', {
        //         editPost, 
           
        //     });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
    }
});



module.exports = router;