require('dotenv').config()

const sequelize = require('../config/connection')
const { Dish, User } = require('../models')

const postData = require('./posts-seeds.json')
const usersData = require('./users-seeds.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true })

    // create users
    let users = await User.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
        raw: true
    })

    // serialize user data
    users = users.map(user => user.dataValues)
    console.log(users)

    // loop through post data
}