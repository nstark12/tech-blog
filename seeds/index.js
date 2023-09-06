require('dotenv').config()

const sequelize = require('../config/connection')
const { User, Post, Comment } = require('../models')

const usersData = require('./users-seeds.json')
const postsData = require('./posts-seeds.json')
const commentsData = require('./comments-seeds.json')


const seedDatabase = async () => {
    await sequelize.sync({ force: true })

    // create users
    const users = await User.bulkCreate(usersData, {
        individualHooks: true,
        returning: true
    })

    // create posts 
    const posts = await Post.bulkCreate(postsData, {
        individualHooks: true,
        returning: true
    })

    // create comments
    const comments = await Comment.bulkCreate(commentsData, {
        individualHooks: true,
        returning: true
    })

    process.exit(0)

}

seedDatabase()