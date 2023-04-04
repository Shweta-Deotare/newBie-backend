const jwt = require("jsonwebtoken");
module.exports = {
 generateToken: (data) => {
  try {
   const token = jwt.sign(data, 'jwtSecretc-chnage-this')
   return token;
  } catch (err) {
   return err;
  }
 }
}