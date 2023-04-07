const jwt = require("jsonwebtoken");
const env = require('dotenv').config();


module.exports = {
 generateToken: (email) => {
  try {
   const token = jwt.sign(email, process.env.SECRET_KEY);
   return token;
  } catch (err) {
   return err;
  }
 }
}