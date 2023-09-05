require('dotenv').config()
require('./models')
const sequelize = require('./config/connection')

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// Dependencies
const express = require('express')
const { engine } = require('express-handlebars')
const path = require('path')

// Set up Express App
const app = express()
const PORT = process.env.PORT || 3001

// TODO set up session


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Set up routes
// app.use(require())

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Server listening on: http://localhost:' + PORT)
    })
})