const bcrypt = require('../utils/hashPassword');


module.exports = {
    userAccountSchema:(sequelize, DataTypes) => {
        console.log("user_accounts Table connected")
        return sequelize.define('user_accounts', {
            id:{
                type:DataTypes.INTEGER,
                allowNull:false,
                unique: true
            },

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
                validate:{
                    verifypasswd(value){
                        if(!(value.length >= 8)){
                           throw new Error("Password length should be at least 8 charecters");
                        }
                    }
                }
            },
        },
        {
            freezeTableName: true,
            hooks:{
                beforeCreate: (record) =>{
                    const salt = 10;    //Store in dotENV file?
                    record.password = bcrypt.getEncryptedPassword(record.password, salt);
                },
                afterCreate:(record) =>{
                    delete record.dataValues.password;
                },
                afterUpdate:(record) =>{
                    delete record.dataValues.password;
                }
            }
        });
    }    
}