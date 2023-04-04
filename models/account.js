
module.exports = {
  userAccountSchema:(sequelize, DataTypes) => {
      console.log("user_account Table connected")
      return sequelize.define('user_accounts', {
          f_name:{
              type:DataTypes.STRING,
              allowNull:false},
          
          l_name: {
              type:DataTypes.STRING,
              allowNull:false},
          username: {
              type:DataTypes.STRING,
              allowNull:false,
              primaryKey:true,
              unique:true},
          email:{
              type:DataTypes.STRING,
              allowNull:false,
              unique:false},
          mobile:{
              type:DataTypes.STRING,
              allowNull:false,
              unique:false,
              validate:{
                  len:[10,10]},
              }, 
          password: {
              type:DataTypes.STRING, // TO DO : update as hash
              allowNull:false,
          },
      });
  }    
}



