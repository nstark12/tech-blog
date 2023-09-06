const express = require('express');
const session = require('express-session');
const routes = require('./controllers')
const exphbs = require('express-handlebars')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up Express App
const app = express()
const PORT = process.env.PORT || 3001

const hbs = exphbs.create({
    helpers: {
      format_date: function (date) {
        return new Date(date).toLocaleDateString()
      }
    }
  })
  app.engine('handlebars', hbs.engine)
  app.set('view engine', 'handlebars')
  app.set('views', './views')
  
  const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Middleware
app.use(session(sess));

app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Server listening on: http://localhost:' + PORT)
    })
})