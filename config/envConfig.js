const dotenv = require('dotenv').config();

module.exports = {
     
      getEnv:(name) =>{
           if(process.env[name] != undefined)
           {
              return process.env[name]
           }else{
             console.log("Env variable "+name+ " is not found");
             return null;
           }
       }
}

// module.exports = {
//     HOST: process.env.DB_HOST,
//     USER: process.env.DB_USER,
//     PASSWORD: process.env.DB_PASSWORD,
//     DB: process.env.DB_NAME,
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
// }