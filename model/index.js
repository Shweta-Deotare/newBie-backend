const env = require('../config/envConfig')[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const userSchema = require("./userModel");

const sequelize = new Sequelize(env.getEnv("DB_NAME"), env.getEnv("DB_USER"), env.getEnv("DB_PASSWORD"),{
    host:env.getEnv("DB_HOST"), 
    dialect: 'mysql'
});

// const {Sequelize, Datatypes} = require('sequelize');

// const sequelize = new Sequelize(
//     dbConfig.DB,
//     dbConfig.USER,
//     dbConfig.PASSWORD,{
//         host:dbConfig.HOST,
//         dialect:'mysql',
//         operatorsAliases:false

//         // pool: {
//         //     max:dbConfig.pool.max,
//         //     min:dbConfig.pool.min,
//         //     aquire:dbConfig.pool.aquire,
//         //     idle:dbConfig.pool.idle
            
//         // }
//     }

// )
const testConnection= () =>{
sequelize.authenticate()
.then(() => {
    console.log("connection established");
})
.catch(err => {
    console.log('error' + err);
})
};

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

const userAccount = userSchema.userAccount(sequelize, Sequelize.DataTypes);


db.sequelize.sync({ force: false})
.then(() => {
    console.log('resync done!');
})

module.exports = {db, userAccount ,testConnection};






