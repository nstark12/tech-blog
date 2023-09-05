const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')
const saltRounds = 10

class User extends Model {
    async checkPassword(plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password)
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqe: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    }
}, {
    sequelize,
    modelName: 'user',
    hooks: {
        beforeCreate: async function(user) {
            user.password = await bcrypt.hash(user.password, saltRounds)
        },
        beforeUpdate: async function(user) {
            user.password = await bcrypt.hash(user.password, saltRounds)
        }
    }
})

module.exports = User