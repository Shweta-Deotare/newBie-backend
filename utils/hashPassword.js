const bcrypt = require('bcryptjs');

module.exports = {
    getEncryptedPassword : (password, saltValue) =>{
        if(password && saltValue){
            try{
                return bcrypt.hashSync(password, saltValue);
            }catch(err){
                console.log("password hashing failed", err);
                return err;
            }  
        }
        else{
            throw new error("Failed to generate hashed Pwd; Password or salt values are invalid");
        }
    },

    validatePassword: (password, hashedPass) =>{
        try{
            const data = bcrypt.compareSync(password, hashedPass);
            return data;
        }catch(err){
            logger.error(err)
            throw err;
        }
    } 
}