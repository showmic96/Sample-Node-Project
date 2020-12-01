const { Sequelize } = require('sequelize');
const dbConfig = require('config').db;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: 'localhost',
    dialect: 'postgres',
});

const userModel = require('../models/user');

global.db = {};
global.db.user = sequelize.define('user', userModel);
//global.db.user.sync({force: true});
