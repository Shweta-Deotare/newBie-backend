const Sequelize = require('sequelize');
const schemas = require("../models/account");

const sequelize = new Sequelize('newbie_database', 'root', 'root', {
 host: 'localhost',
 dialect: 'mysql'
});

const testConnection = () => {
 sequelize.authenticate()
  .then(() => {
   console.log("connection established");
  })
  .catch(err => {
   console.log('error' + err);
  })
};

// @ts-ignore
const userAccount = schemas.userAccountSchema(sequelize, Sequelize.DataTypes);

module.exports = { userAccount , testConnection }
