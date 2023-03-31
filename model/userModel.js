module.exports = { 
  userAccount: (sequelize, DataTypes) => {
      console.log("user accounts table connected");
      return sequelize.define("user_accounts", {
      f_name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      l_name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      username: {
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
        unique:true,
      },
      mobile: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
         validate:{
          len:[10, 10]
         },
      },
      email: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
         isLowercase: true,
         unique:false
      },
      password: {
        type: DataTypes.STRING.BINARY,
        unique: true,
        allowNull: false,
        validate: {
            verifypasswd(value){
              if(!(value.length >=8)){
                throw new Error("Password length should be atleast 8 character"); 
              }
            }
        }

      },
      createdAt:{
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt:{
        type: DataTypes.DATE,
        allowNull: false
      }
    });  
  } 
};