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
    for (const post of postsData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id
        })
    }

    // create comments
    const comments = await Comment.bulkCreate(commentsData, {
        individualHooks: true,
        returning: true
    })

    process.exit(0)

}

seedDatabase()