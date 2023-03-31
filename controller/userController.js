const dotenv = require('dotenv').config();
const db = require('../model/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//create user model
const User = db.users;

const getAllUsers = async (req, res) => {
    let users = await User.findAll()
    res.status(200).send(users);
};

const login = async (req, res) => {
    try{
         let {email, password}=req.body;
​
        //check if the user exist in the database
        let isAvailable = await User.findOne({
            where:{
            email:email
            }
        });
​
        console.log(isAvailable);
        ​
        if (!isAvailable) {
            return res.status(400).send({ message:"User does not exist"})
        }
        ​
        let passComp = bcrypt.compareSync(password, isAvailable.password)
        ​
        if(!passComp){
            return res.status(400).send({ message:"Password is incorrect"})
        }else {
                const token = jwt.sign(
                {
                    email:req.body.email
                },
                env.getEnv("SECRET_KEY"),
                {
                    expiresIn: "2h",
                }
                );
            
                const data = isAvailable.dataValues 
                
                console.log(data);
                res.status(200).json({token,data});
        }
    }catch(err){
        res.status(400).send(err);
    }
};

const register = async (req, res) => {
    ​
  try {
    // Get user input
    const {f_name, l_name, username, mobile, email, password } = req.body;
​
    // Validate user input
    if (!(email &&username && password && f_name && l_name && mobile)) {
      res.status(400).send("All input is required");
    }
​
    console.log(req.body)
   
    // Validate if user exist in our database
    let oldUser = await User.findOne({
      where:{
        email: email
      }
    });
​
    console.log(oldUser);
​
    if (oldUser[0]) {
      return res.status(409).send("User Already Exist. Please Login");
    }
​
    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
​
    // Create user in our database
    const user = await User.create({
      f_name,
      l_name,
      username,
      mobile,
      email: email.toLowerCase(), // convert email to lowercase
      password: encryptedPassword,
    });
​
    console.log(user);
​
    // Create token
    const token = jwt.sign(
      {
        email:req.body.email
      },
      env.getEnv("SECRET_KEY"),
      {
        expiresIn: "2h",
      }
    );
    // save user token
    const data = {id:user.dataValues.id,
                 f_name:user.dataValues.f_name, 
                 l_name:user.dataValues.l_name,
                 username:user.dataValues.username,
                 email:user.dataValues.email,
                 mobile:user.dataValues.mobile,
                 createdAt:user.dataValues.createdAt,
                 updatedAt:user.dataValues.updatedAt}
    data.token = token;
​
    if (data.email){
      res.json("user already exist, please proceed fr login")
    } 
    // return new user
    res.status(201).json(data);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
  
};


module.exports = {
    getAllUsers,
    login,
    register
};